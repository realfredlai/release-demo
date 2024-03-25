'use client';
import { createContext, useCallback, useEffect, useState } from 'react';

import { Unity, useUnityContext } from 'react-unity-webgl';

import { getConfig } from '@reebok/shared';
import { RemixItem, ShoeModel } from '@reebok/backend-libs';

import { LoadingAnimation } from '@/app/components/LoadingAnimation';

import { usePlacementStateStore } from '@/app/store/ShoeRemixStore';
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters';
import CustomizerMovementHint from '../components/Remix/CustomizerMovementHint';

export type ShoeArea =
  | 'Null'
  | 'Toe'
  | 'Lip'
  | 'Right'
  | 'Left'
  | 'Rim'
  | 'Tongue'
  | 'Inside'
  | 'Sole'
  | 'Heel';

export type ColorTarget = 'A' | 'B';

export type ShoeColor = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export type UVValues = {
  x: number;
  y: number;
  z: number;
  w: number;
  [key: string]: number;
};

export type ShoePosition = {
  x: number;
  y: number;
  z: number;
};

export type ShoeMetadata = {
  OriginalImageURL: string;
  GeneratedImageURL: string;
  ShoeModel: ShoeModel;
  LumaMeshIndex: number;
  ColourA: ShoeColor;
  ColourB: ShoeColor;
  ToeUV: UVValues;
  LipUV: UVValues;
  RightUV: UVValues;
  LeftUV: UVValues;
  RimUV: UVValues;
  TongueUV: UVValues;
  InsideUV: UVValues;
  SoleUV: UVValues;
  HeelUV: UVValues;
};

type ModelOptions = 'ThePump' | 'ClubC' | 'ClassicLeather';

type UnityContextType = {
  unityReady: boolean;
  changeViewTarget: (shoeArea: ShoeArea) => void;
  changeColor: (target: ColorTarget, color: ShoeColor) => void;
  changeUV: (target: ShoeArea, uv: UVValues) => void;
  updateShoeTexture: (
    originalImageUrl: string,
    generatedImageUrl: string
  ) => void;
  changeShoeModel: (shoeModel: ModelOptions) => void;
  changeLumaMesh: (index: number) => void;
  changeShoePosition: (shoePosition: ShoePosition) => void;
  takeScreenshot: (
    dataType?: string | undefined,
    quality?: number | undefined
  ) => string | undefined;
  export3DShoe: () => void;
  requestFullscreen: (enabled: boolean) => void;
};

export const UnityContext = createContext<UnityContextType | null>(null);

type UnityProviderProps = {
  children: React.ReactNode;
  shoeType: ShoeModel;
  remix: RemixItem;
};

export const UnityProvider = ({
  children,
  shoeType,
  remix,
}: UnityProviderProps) => {
  // List of Unity Viewer Commands:
  // https://www.notion.so/futureverse/Asset-Viewer-Commands-for-Front-End-Team-Reebok-0f593dce6d664f2f9b983669e37cd64c

  const [unityReady, setUnityReady] = useState(false);
  const [shoeReady, setShoeReady] = useState(false);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);

  const unityContext = useUnityContext({
    loaderUrl: getConfig().unity.loaderUrl,
    dataUrl: getConfig().unity.dataUrl,
    frameworkUrl: getConfig().unity.frameworkUrl,
    codeUrl: getConfig().unity.codeUrl,
    companyName: 'Futureverse',
    productName: 'Reebok Customizer',
    productVersion: '1.0',
  });

  const {
    unityProvider,
    loadingProgression,
    takeScreenshot,
    sendMessage,
    addEventListener,
    removeEventListener,
    requestFullscreen,
  } = unityContext;

  const { placementValues } = usePlacementStateStore();

  const sendCommand = useCallback(
    (header: string, data: object = {}) => {
      const commandBody = JSON.stringify({
        Header: header,
        ...data,
      });
      sendMessage('Core', 'ReceiveMessage', commandBody);
    },
    [sendMessage]
  );

  const changeViewTarget: UnityContextType['changeViewTarget'] = useCallback(
    (shoeArea) => {
      if (!unityReady) return;

      sendCommand('change_view_target', {
        Target: shoeArea,
      });
    },
    [sendCommand, unityReady]
  );

  const changeUV = useCallback(
    (target: ShoeArea, uv: UVValues) => {
      if (!unityReady) return;

      sendCommand('change_uv', {
        Target: target,
        UV: uv,
      });
    },
    [sendCommand, unityReady]
  );

  const changeColor = useCallback(
    (target: ColorTarget, color: ShoeColor) => {
      if (!unityReady) return;

      sendCommand('change_color', {
        Target: target,
        Color: color,
      });
    },
    [sendCommand, unityReady]
  );

  const updateShoeTexture = useCallback(
    (originalImageUrl: string, generatedImageUrl: string) => {
      if (!unityReady) return;

      sendCommand('update_texture', {
        OriginalImageURL: originalImageUrl,
        GeneratedImageURL: generatedImageUrl,
      });
    },
    [sendCommand, unityReady]
  );

  const changeShoeModel = useCallback(
    (shoeModel: ModelOptions) => {
      if (!unityReady) return;

      sendCommand('change_model', {
        Model: shoeModel,
      });
    },
    [sendCommand, unityReady]
  );

  const export3DShoe = useCallback(() => {
    if (!unityReady) return;

    sendCommand('export_shoe');
  }, [sendCommand, unityReady]);

  const changeLumaMesh = useCallback(
    (index: number) => {
      if (!unityReady) return;

      sendCommand('change_luma_mesh', {
        Index: index,
      });
    },
    [sendCommand, unityReady]
  );

  // Unused Unity Method to change shoetype
  // const updateShoeModelSelection = useCallback(() => {
  //   changeShoeModel(shoeType as ModelOptions);
  // }, [changeShoeModel, shoeType]);

  const changeShoePosition = useCallback(
    (newPosition: ShoePosition) => {
      if (!unityReady) return;

      sendCommand('shoe_position', {
        NewPosition: newPosition,
      });
    },
    [sendCommand, unityReady]
  );

  const updateMetadata = useCallback(
    (metadata: ShoeMetadata) => {
      if (!unityReady) return;

      sendCommand('update_metadata', {
        MetaData: metadata,
      });
    },
    [sendCommand, unityReady]
  );

  useEffect(() => {
    const unityReady = () => {
      setUnityReady(true);
    };

    const onShoeExport = (...parameters: ReactUnityEventParameter[]) => {
      const [data] = parameters;

      const base64String = data as string;
      // DO SOMETHING WITH 3D ASSET STRING
    };

    addEventListener('OnUnityStart', unityReady);

    addEventListener('OnShoeExport', onShoeExport);

    return () => {
      removeEventListener('OnUnityStart', unityReady);
      removeEventListener('OnShoeExport', onShoeExport);
    };
  }, [addEventListener, removeEventListener]);

  useEffect(() => {
    const updateUnityData = () => {
      const shoeMetadata: ShoeMetadata = {
        OriginalImageURL: remix.image_original_url as string,
        GeneratedImageURL: remix.image_texture_url as string,
        ShoeModel: shoeType as ShoeModel,
        LumaMeshIndex: remix.luma_mesh_index as number,
        ColourA: remix.custom_colors[0] as ShoeColor,
        ColourB: remix.custom_colors[1] as ShoeColor,
        ToeUV: placementValues.ToeUV,
        LipUV: placementValues.LipUV,
        RightUV: placementValues.RightUV,
        LeftUV: placementValues.LeftUV,
        RimUV: placementValues.RimUV,
        TongueUV: placementValues.TongueUV,
        InsideUV: placementValues.InsideUV,
        SoleUV: placementValues.SoleUV,
        HeelUV: placementValues.HeelUV,
      };

      updateMetadata(shoeMetadata);
    };

    if (unityReady) {
      setDevicePixelRatio(window?.devicePixelRatio || 1);
      updateUnityData();
      changeViewTarget('Sole');

      setTimeout(() => {
        setShoeReady(true);
      }, 1500);

      // TODO: UNITY GIVES ME STARTING ANIMATION SHOE SPIN
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addEventListener, removeEventListener, unityReady]);

  return (
    <UnityContext.Provider
      value={{
        changeViewTarget,
        changeColor,
        updateShoeTexture,
        changeShoeModel,
        changeUV,
        changeShoePosition,
        changeLumaMesh,
        unityReady,
        takeScreenshot,
        export3DShoe,
        requestFullscreen,
      }}
    >
      <Unity
        id="renderer"
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
        matchWebGLToCanvasSize={true}
        className="absolute w-full h-full m-0"
      />
      {shoeReady ? (
        <div className="absolute inset-0 pointer-events-none">
          <CustomizerMovementHint />
          {children}
        </div>
      ) : (
        <LoadingAnimation
          loadingText={`${Math.ceil(loadingProgression * 100)}%`}
        />
      )}
    </UnityContext.Provider>
  );
};

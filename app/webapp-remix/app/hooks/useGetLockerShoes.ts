import { trpc } from '@/trpc';

export const useGetLockerShoes = (userId: string) => {
  const combinedQuery = trpc.useQueries((t) => [
    t.getLatestUserCreations(userId),
    t.getLatestUserCollabs(userId),
    t.getMintedRemixesForUser(userId),
  ]);

  const { data: originals, isLoading: isOriginalsLoading } = combinedQuery[0];
  const { data: collabs, isLoading: isCollabsLoading } = combinedQuery[1];
  const { data: mints, isLoading: isMintsLoading } = combinedQuery[2];

  const originalRemixes = originals ?? [];
  const collabRemixes = collabs ?? [];
  const mintedRemixes = mints ?? [];

  return {
    originalRemixes,
    collabRemixes,
    mintedRemixes,
    isOriginalsLoading,
    isCollabsLoading,
    isMintsLoading,
  };
};

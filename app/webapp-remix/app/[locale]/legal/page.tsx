import { useTranslations } from 'next-intl';
import { H1 } from '@/app/components/Text/H1';
import { SubHeader } from '@/app/components/Text/SubHeader';
// import { Separator } from '@reebok/frontend-components';
import { Text } from '@/app/components/Text/Text';
import { OutLink } from '@/app/components/Text/OutLink';
import { EmailLink } from '@/app/components/Text/EmailLink';
import Link from 'next/link';
// import AnchorNav from '@/app/components/AnchorNav/AnchorNav';

export default function Legal() {
  const t = useTranslations();
  // const legalNavAnchors = [
  //   { anchor: 'terms', text: t('page_legal_anchor_terms') },
  //   { anchor: 'privacy', text: t('page_legal_anchor_privacy') },
  // ];

  return (
    <>
      <div className="bg-primary-bone w-full px-2 lg:px-48 pt-48 pb-4 md:pb-14 gap-8">
        <H1
          variant="h1Extra"
          className="text-center text-5xl md:text-9xl text-primary-brown uppercase"
        >
          {t('page_legal_header')}
        </H1>

        <div className="legals container text-primary-navy max-w-5xl text-base mt-4">
          {/* <AnchorNav anchorNavItems={legalNavAnchors} colorMode="dark" /> */}
          {/* TODO: add legal copy when ready */}
          {/* <span id={legalNavAnchors[0].anchor}></span> */}
          <SubHeader>{t('page_legal_subhead_terms')}</SubHeader>
          <sub className="text-primary-cool-grey mt-4 mb-8 block">
            Last updated: 20 March 2024
          </sub>
          <SubHeader>Definitions</SubHeader>
          <Text variant="paragraph">
            Altered State Machine (ASM) Platform or Altered State Machine
            Protocol is a decentralised protocol providing services relating to
            blockchains, A.I.,
          </Text>
          <Text variant="paragraph">
            Digital Collectible(s) and other functions, and made available
            publicly on the internet. Digital Collectible(s) or Collectibles
            means a unique or limited virtual item, featuring a verifiable
            certificate of ownership. Where we refer to Digital Collectibles
            and/or Collectibles in these Terms, we are referring to Digital
            Reeboks.
          </Text>
          <Text variant="paragraph">
            Digital Reeboks means and refers to Futureverse&apos;s creation of
            digital Reebok sneaker collectible(s) each represented by a Digital
            Collectible that is managed by a blockchain network and the Smart
            Contract code related to that Digital Collectible and its
            collection, on that network.
          </Text>
          <Text variant="paragraph">
            Experiences means any Metaverse and/or web3 experience and/or
            application (App) that has adopted FuturePass for identity and Asset
            management within their experience/App.
          </Text>
          <Text variant="paragraph">
            FuturePass means an on-chain identity contract that can be used to
            manage Collectibles and engage with metaverse Experiences.
            Futureverse Corporation Limited (Futureverse, or &quot;we&quot; or
            &quot;our&quot;) is a New Zealand Limited Liability Company, the
            creator of the Reebok Impact experience (including Website).
          </Text>
          <Text variant="paragraph">
            Futureverse Marks means the registered and unregistered trademarks
            (in word or logo form) of Futureverse and/or any of its affiliated
            or related companies, and all product and/or service names and
            brands, including, without limitation: FUTUREVERSE, FUTUREPASS, F
            PASS, ALTERED STATE MACHINE, ASM, and NON FUNGIBLE INTELLIGENCE;
          </Text>
          <Text variant="paragraph">
            Futureverse Materials means all intellectual property rights owned
            by and/or licensed to Futureverse or any of its affiliated
            companies, including copyrights, know-how, the Futureverse Marks,
            Futureverse Content, and any updates or modifications to the
            aforementioned.
          </Text>
          <Text variant="paragraph">
            Licensing Agreement means the Reebok Impact Digital Collectibles
            Licensing Agreement, available here
          </Text>
          <Text variant="paragraph">
            New Zealand Consumer Laws means the New Zealand Consumer Guarantees
            Act 1993 (NZ) and the Fair Trading Act 1986 (NZ);
          </Text>
          <Text variant="paragraph">
            Privacy Policy means our Privacy Policy, available here
          </Text>
          <Text variant="paragraph">
            Reebok Marks means the Reebok trademark, the Reebok logo, and other
            Reebok product and service names and logos.
          </Text>
          <Text variant="paragraph">
            Reebok Materials means the Reebok intellectual property rights; the
            Reebok Marks; all Reebok pre-existing products; and any updates or
            modifications to the same, in each case including all of their
            constituent elements with all intellectual property rights in them.
          </Text>
          <Text variant="paragraph">
            Reebok means RILUK IPCO LIMITED, the company which owns the global
            consumer goods brand Reebok, and is one of our licensors.
          </Text>
          <Text variant="paragraph">
            Risk Disclosure means the Futureverse Risk Disclosure describing
            some of the risks associated with digital assets and smart
            contracts, as well as some other risks, available here.
          </Text>
          <Text variant="paragraph">
            Service(s) means the Reebok Impact experience, including Website and
            Digital Reeboks.
          </Text>
          <Text variant="paragraph">
            Smart Contract means lines of code or a transaction protocol which
            is intended to automatically execute, control or document basic
            relevant events and actions according to the terms of an agreement.
            The code and the agreements contained therein exist across a
            distributed, decentralized blockchain network.
          </Text>
          <Text variant="paragraph">
            Third Party Content means content that is uploaded, posted,
            submitted or otherwise transmitted by third parties, including but
            not limited to, in the form of APIs, links or feeds from or to other
            websites or resources;
          </Text>
          <Text variant="paragraph">
            User Image means the image(s) uploaded by a User for the purpose of
            generating Digital Reeboks.
          </Text>
          <Text variant="paragraph">
            User Image Confirmations means the representations and warranties
            provided by You confirming Your rights in the User Images, as
            described in part 4 of these Terms.
          </Text>
          <Text variant="paragraph">
            User Submissions means content that is uploaded, posted, submitted
            or otherwise transmitted by Users of the Service, including User
            Images.
          </Text>
          <Text variant="paragraph">
            Website refers to the internet website hosted at
            <Link href="/">https://reebokimpact.com</Link> operated by
            Futureverse.
          </Text>
          <Text variant="paragraph">
            Whitepaper means the Futureverse Whitepaper, available here.
          </Text>
          <SubHeader>Your access or use of our Website</SubHeader>
          <Text variant="paragraph">
            Your access or use of our WebsiteFutureverse is the provider of this
            Website. The following Terms of Service and any documents referred
            to herein (&quot;Terms&quot;) apply to this Website.
          </Text>
          <Text variant="paragraph">
            By accessing, viewing, using, the Website, whether or not you become
            a registered user (&quot;User&quot;, &quot;You&quot;,
            &quot;Yourself&quot;, &quot;Your&quot;), You agree to be bound by
            these Terms, which You acknowledge to have read and understood.
          </Text>
          <Text variant="paragraph">
            The use of particular Services may be subject to specific terms of
            service related to the concerned Service. In using such Services,
            You agree to be bound by the terms then in force. Where there is any
            inconsistency between these Terms and any other terms of service,
            those other terms of service shall prevail in respect of the
            concerned service.
          </Text>
          <Text variant="paragraph">
            Digital Reeboks (Digital Collectible) have Smart Contracts that run
            on a blockchain network and are bound by its immutability, there is
            no ability to undo, reverse, or restore any transactions. Subject to
            New Zealand Consumer Laws, Futureverse is unable to offer refunds on
            any transactions, under any circumstances.
          </Text>
          <Text variant="paragraph">
            To the extent permitted by law, this Website, our Smart Contract,
            and all connected services related to the Digital Reeboks are
            provided &quot;as is&quot; without any warranty or promise of
            availability of services of any kind.
          </Text>
          <Text variant="paragraph">
            By using this Website to claim, purchase or manage the Digital
            Collectible(s), You are accepting sole responsibility for any and
            all transactions involving these Collectibles, and any others
            offered by Futureverse and added to this Website in the future.
          </Text>
          <Text variant="paragraph">
            You must be a person over the age of 18 years old (or of legal age
            in your country of residence) and able to enter into contracts or
            have the permission of your parent/guardian.
          </Text>
          <SubHeader>Mandatory Consumer Laws</SubHeader>
          <Text variant="paragraph">
            If you are a &quot;consumer&quot; for the purposes of New Zealand
            Consumer Laws:
          </Text>
          <ol className="alpha">
            <li>
              nothing in these Terms excludes, restricts, or modifies the
              application of any provision, and/or the exercise of any right or
              remedy, that you may have under New Zealand Consumer Laws; and
            </li>
            <li>our services come with guarantees that cannot be excluded.</li>
          </ol>
          <Text variant="paragraph">
            Nothing in these Terms is intended to limit the application of any
            equivalent mandatory consumer laws applicable in any other
            jurisdiction.
          </Text>
          <SubHeader>The Reebok Impact Experience</SubHeader>
          <Text variant="paragraph">
            The Reebok Impact experience currently consists of two key parts,
            which may be modified at our discretion:
          </Text>
          <ol className="roman">
            <li>
              Part one: Reebok Impact chatbot integrated within the Instagram
              application, where a User is invited to direct message
              (&apos;DM&apos;) a User Image to begin creation of a unique
              digital sneaker.
            </li>
            <li>
              Part two: Reebok Impact website, where the sneaker creation
              experience continues and a user is able to sign up to claim and
              purchase their unique digital sneaker.
            </li>
          </ol>
          <Text variant="paragraph">
            For further information on the experience including FAQs please
            visit:
            <Link href="/support">https://reebokimpact.com/faqs</Link>
          </Text>
          <Text variant="paragraph">User Image(s):</Text>
          <ol className="alpha">
            <li>
              You represent and warrant that you own or have full, unrestricted
              rights to use any User Images, and that you have the right to
              grant the User Image license to Futureverse and Reebok below. You
              must only upload User Image(s) for the Reebok Impact experience
              which you own or have full rights to use; and
            </li>
            <li>
              Where you choose to upload any User Image with identifiable people
              in it, you represent and warrant that you have the consent,
              release, and/or permission of every identifiable individual to use
              that User Image for the purpose of the Reebok Impact experience,
            </li>
          </ol>
          <Text variant="paragraph">
            (together, the User Image Confirmations).
          </Text>
          <Text variant="paragraph">
            You grant Futureverse and Reebok a right to use the User Image(s)
            you upload for the purpose of generating a Digital Sneaker (whether
            or not that Digital Sneaker is claimed by you), and for such User
            Image(s) to be stored and used within relevant software utilised for
            the purpose of the Reebok Impact experience and/or displayed on the
            Website or in connection with the Service.
          </Text>
          <Text variant="paragraph">
            You indemnify Futureverse and Reebok in relation to any loss, costs,
            and/or damages (whether direct or indirect) arising from or in
            connection with any claim that:
          </Text>
          <ol className="roman">
            <li>
              User Image(s) uploaded by you as part of Reebok Impact infringe
              any third-party intellectual property rights; and/or
            </li>
            <li>
              you did not have requisite consent to use any User Image(s)
              uploaded by you as part of Reebok Impact.
            </li>
          </ol>
          <Text variant="paragraph">
            You acknowledge that where you invite other User(s) to collaborate
            with You on co-designing any Digital Reebok, in addition to You,
            those User(s) will also be able to claim and purchase the Digital
            Reebok, which includes the User Image.
          </Text>
          <SubHeader>FuturePass</SubHeader>
          <Text variant="paragraph">
            In order to purchase, claim or own a Digital Reeboks, Users must own
            or create a FuturePass.
          </Text>
          <Text variant="paragraph">
            FuturePass is subject to its own
            <OutLink href="https://www.futureverse.com/legal/futurepass-t-cs">
              Terms and Conditions
            </OutLink>
            , which govern the use of a User&apos;s FuturePass within metaverse
            Experiences.
          </Text>
          <Text variant="paragraph">
            FuturePass Terms and Conditions will be presented to Users during
            the Reebok Impact experience, and on acceptance of these Terms, a
            FuturePass will be created.
          </Text>
          <SubHeader>Blockchain Account & Wallets</SubHeader>
          <Text variant="paragraph">
            Users are entirely responsible for the safety and management of
            their own private wallets and validating all transactions and
            contracts generated by this Website before approval.
          </Text>
          <SubHeader>
            Your ownership rights relating to these Collectibles
          </SubHeader>
          <Text variant="paragraph">
            When you validly purchase and acquire a Digital Reebok or other
            Digital Collectibles using this Website you will be licensed
            non-exclusive, personal and non-commercial rights to your
            Collectible and the underlying art of that specific Collectible, so
            long as you continue to own and control the related Digital
            Collectible as outlined in these terms and our License Agreement.
          </Text>
          <Text variant="paragraph">
            Your ownership of and license rights in/to the Collectible is
            mediated entirely by our Smart Contract. Subject only to Removals,
            at no point can we seize, freeze, or otherwise modify the ownership
            of any Collectible. You are responsible for managing your ownership
            and license of the Collectible. You must use your Digital Reebok
            Sneaker(s) in accordance with these Terms and the terms of the
            Licensing Agreement.
          </Text>
          <Text variant="paragraph">
            You cannot use the names &quot;Reebok&quot;, &quot;Pump&quot;,
            &quot;Classic Leather&quot;, &quot;Club C&quot; derivations of these
            or any derivations thereof or any other intellectual property of
            Reebok, other than genuine and honest use required to identify your
            Digital Reebok.
          </Text>
          <Text variant="paragraph">
            You agree not to use your Collectible in any project or derivative
            work that involves hatred, intolerance, racism, cruelty, obscenity,
            unlicensed gambling, drug use, or any illegal content. If you sell,
            trade, donate, give away, or otherwise dispose of your Collectible,
            you understand that you may be required to pay a royalty fee to
            Futureverse as part of that transaction, as set by the Smart
            Contract related to the Collectible or by the marketplace.
          </Text>
          <Text variant="paragraph">
            Subject to Your rights in/to the User Image in your Collectible, if
            you sell, trade, donate, give away, or otherwise dispose of your
            Collectible, all of your rights in and to the Collectible will
            immediately cease, and you will have no further rights in the
            Collectible or the associated media. Any and all such rights shall
            be assigned to the new owner of the Collectible.
          </Text>
          <SubHeader>Your usage rights relating to Reebok</SubHeader>
          <Text variant="paragraph">
            All right, title and interest (including all copyrights, trademark
            rights, and any associated goodwill, and all other intellectual
            property rights) in the Reebok Marks are owned and controlled by
            Reebok or its affiliates, as applicable.
          </Text>
          <Text variant="paragraph">
            Any Reebok Materials that you receive in connection with your
            purchase and license of a Collectible grants you only a limited
            license to use such Reebok Material subject to the restrictions,
            terms and conditions set forth herein and in the License Agreement.
            You acknowledge and agree that the Reebok Material is provided under
            a license and not sold.
          </Text>
          <Text variant="paragraph">
            Your purchase and/or ownership of any Collectible does not permit
            you to use or otherwise acquire any rights in the names and/or words
            &quot;Reebok&quot;, &quot;Pump&quot;, &quot;Classic Leather&quot;,
            &quot;Club C&quot; or any derivations thereof or any other Reebok
            Materials other than in accordance with the Licensing Agreement. You
            may not use these names or any derivations thereof in connection
            with any business, product, content or service you provide (directly
            or indirectly), or in any manner that may imply that Reebok, or
            Futureverse endorses them, or that is likely to cause confusion or
            dilute, blur or diminish the value of such names and/or words or do
            anything which brings the Reebok or Futureverse brand into
            disrepute.
          </Text>
          <SubHeader>Intellectual Property and Content</SubHeader>
          <Text variant="paragraph">
            Futureverse and its licensors own the copyright and all intellectual
            property rights in and to the Website and to all information, data,
            text, software, music, sound, photographs, graphics, videos,
            messages, feeds offered through the Website and any other material
            on the Website (together the &quot;Content&quot;).
          </Text>
          <Text variant="paragraph">
            Content may not be used, reproduced, distributed, transmitted,
            broadcast, displayed, sold, licensed or otherwise exploited for any
            other purposes than for accessing and using it on the Website save
            as permitted pursuant to agreement in writing with the relevant
            rights holder (as set out below). For that sole and exclusive
            purpose, Futureverse grants You a limited, revocable, non-exclusive
            licence to access the Website and use the Content privately for
            non-commercial purposes, in accordance with these Terms. Futureverse
            and/or its licensors reserve all rights on the Website and the
            Content.
          </Text>
          <Text variant="paragraph">
            Furthermore, You are not permitted to use any Futureverse Marks,
            Futureverse Materials, Reebok Materials and/or Third-Party Content
            names, logos, pictures, copyrights, trademarks, service marks, and
            all other intellectual property rights of any kind, whether
            registered or unregistered unless separately and previously agreed
            to in writing by the relevant rights holder.
          </Text>
          <SubHeader>Third Party Content</SubHeader>
          <Text variant="paragraph">
            Your business dealings with, or participation in promotions of, any
            third party advertisers and merchants found on or through the
            Website, including payment for and delivery of related third party
            goods or services, and any other terms, conditions, warranties or
            representations associated with such dealings, are solely between
            You and such advertisers or merchants.
          </Text>
          <Text variant="paragraph">
            You hereby agree that Futureverse shall not be responsible or liable
            for any loss or damage of any kind incurred as the result of any
            such dealings or as the result of the presence of such advertisers
            or merchants on the Website.
          </Text>
          <Text variant="paragraph">
            Futureverse has no control over content that is uploaded, posted,
            submitted or otherwise transmitted by third parties, including in
            the form of APIs, links or feeds from or to other websites or
            resources (&quot;Third Party Content&quot;).
          </Text>
          <Text variant="paragraph">
            You hereby acknowledge and agree that Futureverse is not responsible
            for the availability of external sites or resources, does not
            endorse, and is not responsible or liable for, any Third-Party
            Content available on such sites or resources.
          </Text>
          <Text variant="paragraph">
            You further acknowledge and agree that Futureverse shall not be
            responsible or liable, directly or indirectly, for any damage or
            loss caused or alleged to have been caused by or in connection with
            the use of, or reliance upon, any Third-Party Content, goods,
            services or any other material available on or through any APIs,
            links or feeds from or to other websites or resources.
          </Text>
          <SubHeader>Third Party Sites</SubHeader>
          <Text variant="paragraph">
            Our Website may include links to external sites. These sites are not
            under our control and we are not responsible for, and we make no
            representations or warranties concerning the contents of any such
            external site. Such links are provided to you only as a convenience,
            and the inclusion of any link does not imply any recommendation,
            endorsement, verification, or certification by us of the linked
            site.
          </Text>
          <Text variant="paragraph">
            Should You engage with any Third Party Sites, You are solely
            responsible for adhering to the terms and conditions provided by the
            Third Party Site.
          </Text>
          <SubHeader>Licenses and Trademarks</SubHeader>
          <Text variant="paragraph">
            You agree that all right, title and interest (including all the
            copyright, trade marks, service marks, and all other intellectual
            property rights of any kind, whether registered or unregistered) in
            and to the Service (whether present or in the future), including,
            without limitation, to all information, data, text, software, music,
            sound, photographs, graphics, videos, messages, feeds offered
            through the Website belong to us and/or our licensors (as
            applicable).
          </Text>
          <Text variant="paragraph">
            The Service may not be used, reproduced, distributed, transmitted,
            broadcast, displayed, sold, licensed or otherwise exploited for any
            other purposes than for accessing and using the Service save as
            permitted pursuant to agreement in writing with the relevant rights
            holder (as set out below).
          </Text>
          <Text variant="paragraph">
            {' '}
            For that sole and exclusive purpose, we and/or our licensors grant
            you a limited, revocable, non-exclusive license to use the Service
            strictly for the purpose of participating in the Service privately
            for non-commercial purposes, in accordance with these Terms and
            subject to the terms and conditions set out in the Licensing
            Agreement for the period the Service is available. Futureverse
            and/or its licensors reserve all rights in the Service and nothing
            in these Terms and/or the Licensing Agreement constitute a transfer
            of any of our (and/or our third party licensors&apos;) intellectual
            property rights.
          </Text>
          <Text variant="paragraph">
            {' '}
            Subject to privacy laws, and our Privacy Policy, You grant
            Futureverse (and/or our licensors) an irrevocable, non-exclusive,
            royalty-free, perpetual, sub-licensable and transferable license
            throughout the universe, to use, reproduce, distribute, prepare
            derivative works of, display and perform User Submissions for any
            purpose in connection with the Service or Futureverse&apos;s (and
            its successor&apos;s) business for any purpose, including, but not
            limited to, promoting and redistributing part or all of the User
            Submissions (and derivative works thereof) in any and/or all media
            formats and through any and/or all media channels.
          </Text>
          <Text variant="paragraph">
            Aside from the right granted to You (which may include some of the
            Reebok Marks and/or the Futureverse Marks), You agree not to display
            or use the Reebok Marks, Futureverse Marks or any other intellectual
            property owned or controlled by Reebok, Futureverse, or any third
            party content in any other manner unless separately and previously
            agreed to in writing by the relevant rights holder including, but
            not limited to, the Licensing Agreement.
          </Text>
          <SubHeader>User Submissions</SubHeader>
          <Text variant="paragraph">
            You shall be solely responsible for your own User Submissions and
            the consequences of uploading them.
          </Text>
          <Text variant="paragraph">You acknowledge and agree that:</Text>
          <ol className="alpha">
            <li>
              the Service provides, in some cases, unfiltered access to User
              Submissions. You hereby acknowledge and agree that Futureverse
              only acts as a platform for such User Submissions and that we are
              not liable for such content posted in the Service, whether arising
              under intellectual property laws, libel, privacy, obscenity, or
              otherwise. Futureverse cannot, nor does it undertake any
              obligation, to control User Submissions. By their very nature,
              User Submissions in the Service are changed frequently, may be
              inaccurate and in some cases may be mislabelled or deceptively
              mislabelled. We do not make any representation or warranty,
              express or implied, as to User Submissions;
            </li>
            <li>
              we have no obligation to post any User Submission from You or
              anyone else. In addition, we may, at our sole discretion, edit,
              remove or delete any User Submission that you post or submit,
              including a Removal, as well as terminate your access to the
              Service without notice if, in our opinion, such User Submission
              infringes another individual&apos;s intellectual property rights
              or otherwise does not comply with any provision of these Terms;
              and
            </li>
            <li>
              we reserve the right to determine the final design, layout and
              functionality of the Service, which may involve the review,
              formatting and editing of User Submissions.
            </li>
          </ol>
          <Text variant="paragraph">
            You represent and warrant that your User Submissions shall not:
          </Text>
          <ol className="alpha">
            <li>
              infringe any copyright, patent, trademark, trade secret, or other
              proprietary rights or right of publicity or privacy, including for
              any use by Futureverse pursuant to the license granted;
            </li>
            <li>violate any law or regulation; </li>
            <li>be defamatory or trade libellous;</li>
            <li>
              be obscene, offensive, inappropriate, or contain pornography;
            </li>
            <li>
              include information that is incomplete, false, misleading,
              deceptive, or inaccurate information about Yourself or any
              information about any other individual, is likely to bring us into
              disrepute or otherwise illegal; and
            </li>
            <li>
              contain any viruses, Trojan horses, worms, time bombs, cancelbots
              or other computer programs that are intended to damage,
              detrimentally interfere with, surreptitiously intercept or
              expropriate any system, data or personal information.
            </li>
          </ol>
          <Text variant="paragraph">
            You, in particular, represent and warrant that you have the written
            consent, release, and/or permission of each and every identifiable
            individual in any User Submission to use their name or likeness.
          </Text>
          <Text variant="paragraph">
            Where Futureverse reasonably considers that any User Image breaches
            the User Image Confirmations, including due to potential third party
            intellectual property infringement and/or privacy issues, or that a
            User Image otherwise violates any of these Terms or is illegal,
            Futureverse reserves the right to remove, cover, amend, or otherwise
            replace the User Image from the Digital Collectible, with or without
            notice (Removal). Where we have Your contact details, we will notify
            You of any Removal. All Removals are final and no refund will be
            issued in respect of any Removal.
          </Text>
          <SubHeader>Futureverse Marks</SubHeader>
          <Text variant="paragraph">
            Subject to any limited licence rights granted in accordance with
            these Terms, all rights in or to the Futureverse Marks and all
            Futureverse Materials are retained by Futureverse.
          </Text>
          <Text variant="paragraph">
            You agree not to display or use the Futureverse Marks, the
            Futureverse Content or any other Futureverse Materials or
            intellectual property owned or controlled by Futureverse inx any
            other manner without Futureverse&apos;s prior written consent.
          </Text>
          <SubHeader>Purchasing of Digital Collectibles</SubHeader>
          <Text variant="paragraph">
            You will be able to purchase Digital Collectibles via our third
            party credit card payment provider (Third Party Payment Provider).
          </Text>
          <Text variant="paragraph">
            Where Digital Collectable(s) are purchased via Third Party Payment
            Provider you acknowledge and agree that:
          </Text>
          <ol className="alpha">
            <li>
              your contractual partner in providing payment services to you will
              be the relevant Third Party Payment Provider and such payment
              services will be governed by the relevant Third Party Payment
              Provider&apos;s terms and conditions;{' '}
            </li>
            <li>
              you must comply with the relevant Third Party Payment
              Provider&apos;s terms and conditions, rules or policies when
              accessing these payment services;
            </li>
            <li>
              you are responsible for all charges in relation to your use of
              these payment services, and must provide accurate and complete
              payment information to the relevant Third Party Payment Provider;
            </li>
            <li>
              the Third Party Payment Provider will be responsible for providing
              the payment services and;
            </li>
            <li>
              to the extent permitted by law, we accept no liability or
              responsibility for payments made through Third Party Payment
              Providers.
            </li>
          </ol>
          <Text variant="paragraph">
            You acknowledge and agree that there may be risks associated with
            Digital Collectible(s). For further information please see our Risk
            Disclosure describing some of the risks associated with digital
            assets, including Digital Collectible(s), and Smart Contracts, as
            well as other risks.
          </Text>
          <SubHeader>Additional information</SubHeader>
          <Text variant="paragraph">
            You agree to provide us with any information we may reasonably
            request at any time to meet our legal obligations in any
            jurisdiction.
          </Text>
          <SubHeader>Modifications and interruptions</SubHeader>
          <Text variant="paragraph">
            Futureverse reserves the right at any time to modify or discontinue,
            temporarily or permanently, the Website, the Services, and the
            Content (or any part thereof) with or without notice. To the extent
            permitted by applicable law, Futureverse shall not be held liable to
            You or to any third party for any modification, suspension or
            discontinuance of the Website, Services and/or Content.
          </Text>
          <Text variant="paragraph">
            Although Futureverse will take reasonable care in ensuring that the
            Website, Services, and Content are up to date, they may be out of
            date at any given time, and Futureverse is under no obligation to
            update them.
          </Text>
          <SubHeader>Privacy Policy</SubHeader>
          <Text variant="paragraph">
            By accessing or using the Website, or submitting Your personal
            information to the Website, you acknowledge and consent to
            Futureverse collecting, storing, and using personal information
            associated in accordance with our Privacy Policy set out at
            <Link href="/legal">https://reebokimpact.com/legal</Link>
            (&quot;Privacy Policy&quot;).
          </Text>
          <Text variant="paragraph">
            We do not knowingly collect Personal Information from children under
            the age of 18. If you are a parent or guardian and believe your
            minor child has provided us with Personal Information without your
            consent, please contact us at{' '}
            <EmailLink emailAddress="privacy@futureverse.com">
              privacy@futureverse.com
            </EmailLink>
            and we will take steps to delete such Personal Information from our
            systems.
          </Text>
          <SubHeader>Disclaimer</SubHeader>
          <Text variant="paragraph">
            Except as required by New Zealand Consumer Laws or as otherwise
            required by law, we and our licensor make no warranties (either
            express or implied) or representation about the Service, including
            no warranty or representation that use of the Service will be:
          </Text>
          <ol className="alpha">
            <li>
              uninterrupted, secure, or error-free (including free from viruses
              or other malicious code);
            </li>
            <li>
              fit for purposes, of merchantable quality, or non-infringing;
            </li>
            <li>that the Service will be compatible with your device; or</li>
            <li>
              will meet your requirements unless we have advised you
              specifically.
            </li>
          </ol>
          <Text variant="paragraph">
            Other than in respect of the rights and remedies available to
            consumers under New Zealand Consumer Law, you acknowledge and agree
            that:
          </Text>
          <ol className="alpha">
            <li>
              downloading or obtaining any material (including Digital
              Collectibles) through the use of the Service shall be done at your
              own discretion and risk. You will be solely responsible for any
              damage to your computer system or loss of data that may result
              from downloading any such material; and{' '}
            </li>
            <li>
              commentary and other materials posted by us on the Service are not
              intended to be considered to be reliable advice. No information,
              whether oral or written, obtained by you from us, or through or
              from the Service, shall create any warranty or other obligation
              not expressly stated in the terms, and we disclaim all liability
              and responsibility arising from any reliance placed upon such
              materials or by anyone who may be informed of the Service
            </li>
          </ol>
          <SubHeader>Limitations of liability</SubHeader>
          <Text variant="paragraph">
            TO THE EXTENT PERMITTED BY LAW, AND EXCEPT AS EXPRESSLY STATED IN
            THESE TERMS, FUTUREVERSE AND OUR LICENSORS (INCLUDING REEBOK) DOES
            NOT MAKE ANY REPRESENTATIONS OR WARRANTIES AND EXPLICITLY DISCLAIMS
            ALL OTHER REPRESENTATIONS AND WARRANTIES INCLUDING WITHOUT
            LIMITATION, IN RELATION TO DIGITAL COLLECTIBLE(S) OR ANY ASSOCIATED
            SMART CONTRACTS, WHETHER EXPRESS, IMPLIED, WRITTEN, ORAL OR
            STATUTORY, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
            FITNESS FOR A PARTICULAR PURPOSE, AND WARRANTIES OTHERWISE ARISING
            FROM A COURSE OF DEALING, COURSE OF PERFORMANCE OR USAGE OF TRADE.
          </Text>
          <ol className="alpha">
            <li>
              Subject to paragraph (b) below, and New Zealand Consumer Laws to
              the fullest extent permitted by law:
              <ul className="disc">
                <li>
                  we are not liable for any loss, costs, liability, expenses or
                  damages (including direct or indirect, incidental,
                  consequential or exemplary) arising from or in relation to:
                  <ul className="circle">
                    <li>your use of the Service;</li>
                    <li>
                      our inability to provide the Service or carry out our
                      obligations; or
                    </li>
                    <li>
                      our decision to change, modify, suspend or discontinue the
                      Service,
                    </li>
                  </ul>
                  other than to mint your Digital Sneaker following payment in
                  full in accordance with these Terms; and
                </li>
                <li>
                  Futureverse&apos;s total liability to you (if any) (whether in
                  contract, tort or otherwise) in relation to the Service shall
                  be limited in aggregate to the greater of:
                  <ul className="circle">
                    <li>$50 (fifty) New Zealand Dollars; and </li>
                    <li> a refund of purchases made by you.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              Nothing in these Terms shall affect the statutory rights of any
              consumer or exclude or restrict any liability for death or
              personal injury arising from our gross negligence or wilful fraud
              or any other liability which cannot be excluded or limited under
              New Zealand Law.
            </li>
          </ol>
          <SubHeader>No guarantee or promise of future services</SubHeader>
          <Text variant="paragraph">
            Futureverse intends to support and develop the Reebok Impact Digital
            Sneaker collection, and the communities associated with these
            products. While we intend to accomplish those goals, we cannot make
            any guarantee of further developments. By claiming, purchasing,
            managing, or owning Digital Reebok(s), or using any associated Smart
            Contracts, You agree that You are not relying on any future
            commitments from Futureverse. Failure to further develop the Reebok
            Impact Digital Sneaker collection will not affect the rights granted
            in respect of validly purchased Digital Sneakers and their related
            Smart Contracts.
          </Text>
          <SubHeader>Variation to Terms</SubHeader>
          <Text variant="paragraph">
            We may update, amend or otherwise modify these Terms from time to
            time. We will notify you via the Service or by posting the updates
            to these Terms on our Website.
          </Text>
          <Text variant="paragraph">
            Any use of or access to the Service after the effective date of any
            amendment will constitute your deemed acceptance of the updated
            Terms. If you do not agree with any amendment to these Terms you
            must stop using the Service and you may be prevented from using the
            Service.
          </Text>
          <SubHeader>Notices</SubHeader>
          <Text variant="paragraph">
            We may provide you with notices, information and correspondence via
            electronic communications, including by email or posting
            notifications within the Service and/or through your FuturePass.{' '}
          </Text>
          <SubHeader>General Information</SubHeader>
          <Text variant="paragraph">
            You acknowledge and agree You have read and accepted the Whitepaper
            and our Risk Disclosure as published on our website and available
            here to view
            <Link href="/legal">https://reebokimpact.com/legal</Link>
          </Text>
          <Text variant="paragraph">
            Any failure by Futureverse to exercise or enforce any right or
            provision of the Terms shall not constitute a waiver of such right
            or provision.
          </Text>
          <Text variant="paragraph">
            If any provision of the Terms is found to be invalid, the parties
            nevertheless agree that the parties&apos; intentions, as reflected
            in the provision, shall be given effect to the fullest extent
            practicable, and the other provisions of the Terms remain in full
            force and effect. The section titles in the Terms are for
            convenience only and have no legal or contractual effect.
          </Text>
          <Text variant="paragraph">
            You agree that for purposes of any legal dispute, You will be
            subject to the jurisdiction of New Zealand and that any legal
            proceeding will be brought in New Zealand.
          </Text>
          <Text variant="paragraph">
            Any dispute will be settled by negotiation by first emailing:
            <EmailLink emailAddress="privacy@futureverse.com">
              privacy@futureverse.com
            </EmailLink>
            . If no agreement is reached within 2 months, then the dispute will
            be resolved by mediation overseen by a New Zealand based mediator
            chosen by the parties to the dispute. Any dispute that is not
            resolved by mediation within 6 months of the dispute, will be
            resolved through the New Zealand courts.
          </Text>
          <Text variant="paragraph">
            Where these Terms and have been translated into other languages
            (from English), in the event of any discrepancy between the English
            and the translated texts, the English text shall prevail and be used
            to solve doubts of interpretation. The Terms and Website are
            governed by New Zealand law.
          </Text>
          <SubHeader>Violations</SubHeader>
          <Text variant="paragraph">
            Please report any violations of the Terms to Futureverse via
            <EmailLink emailAddress="privacy@futureverse.com">
              privacy@futureverse.com
            </EmailLink>
          </Text>
          <SubHeader>Technical Support</SubHeader>
          <Text variant="paragraph">
            If you need technical support, please refer to our FAQs at
            https://reebokimpact/faqs or contact our support team at
            https://reebokimpact/support
          </Text>
        </div>
      </div>
    </>
  );
}

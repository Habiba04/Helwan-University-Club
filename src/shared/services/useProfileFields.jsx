import {
    useGender,
    useNationality,
    useSocialStatus,
    useJobTypes,
    useSubscriptionMode,
    useSubscriptionType,
    useSubscriptionStatus,
    useMembership
    
 } from "../rules";

const useProfileFieldsRoles = () => {

    const [Gender, startG, optionalG] = useGender();
    const [Nationality, startN, optionalN, hasAutoFillDOB] = useNationality();
    const [SocialStatus, startS, optionalS] = useSocialStatus();
    const [JobTypes, startJ, optionalJ, noSalary] = useJobTypes();
    const [SubscriptionMode, startSM, optionalSM] = useSubscriptionMode();
    const [SubscriptionType, startST, optionalST, yearlySubscription, monthlySubscription, halfYearlySubscription] = useSubscriptionType();
    const [SubscriptionStatus, startSS, optionalSS] = useSubscriptionStatus();
    const [Membership, startM, optionalM, workingMembership, sportMembership, foreignerMembership, allowedForeignerMembership] = useMembership();

    return {
        gender: {
            fields: Gender,
            start: startG,
            optional: optionalG
        },
        nationality: {
            fields: Nationality,
            start: startN,
            optional: optionalN,
            autoDOBFill: hasAutoFillDOB
        },
        socialStatus: {
            fields: SocialStatus,
            start: startS,
            optional: optionalS
        },
        jobTypes: {
            fields: JobTypes,
            start: startJ,
            optional: optionalJ,
            noSalary: noSalary
        },
        subscriptionMode: {
            fields: SubscriptionMode,
            start: startSM,
            optional: optionalSM
        },
        subscriptionType: {
            fields: SubscriptionType,
            start: startST,
            optional: optionalST,
            yearlySubscription: yearlySubscription,
            monthlySubscription: monthlySubscription,
            halfYearlySubscription: halfYearlySubscription
        },
        subscriptionStatus: {
            fields: SubscriptionStatus,
            start: startSS,
            optional: optionalSS
        },
        membership: {
            fields: Membership,
            start: startM,
            optional: optionalM,
            workingMembership: workingMembership,
            sportMembership: sportMembership,
            foreignerMembership: foreignerMembership,
            allowedForeignerMembership: allowedForeignerMembership
        }
    }
};

export default useProfileFieldsRoles;
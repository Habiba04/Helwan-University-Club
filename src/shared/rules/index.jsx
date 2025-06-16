import useGender from "./gender";
import useNationality from "./nationality";
import useSocialStatus from "./socialStatus";
import useJobTypes from "./jobs";
import useSubscriptionMode from "./subscriptionMode";
import useSubscriptionType from "./subscriptionType";
import useSubscriptionStatus from "./subscriptionStatus";
import useMembership from "./membership";

/*
# rule:
0 : language keywordd
1 : start value of enum in backend 
2 : optional value state
3>: policy of use (protocol)
*/
export {
    useGender,
    useNationality,
    useSocialStatus,
    useJobTypes,
    useSubscriptionMode,
    useSubscriptionType,
    useSubscriptionStatus,
    useMembership
 };
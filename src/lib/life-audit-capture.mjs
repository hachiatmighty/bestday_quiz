// Explicit boundaries: never spread session state into a network payload.
export function capturePayload(s) {
 const {attemptId,firstName,email,whatsapp,whatsappConsent,consent,focusArea,segment,timeOption,ratings,source,quizVersion}=s;
 return {quiz:'life_audit',stage:'capture',attemptId,firstName,email,whatsapp,whatsappConsent,consent,focusArea,segment,timeOption,ratings:{...ratings},source:{...source},quizVersion};
}
export function commitmentPayload(s) {
 const {attemptId,email,goal,goalEdited,horizon,firstStep,day}=s;
 return {quiz:'life_audit',stage:'commitment',attemptId,email,goal,goalEdited,horizon,firstStep,day:day??null};
}
export const newDelivery = () => ({pending:null,changedAt:0,lastSuccess:null,inFlight:false});
export function changedDelivery(state,payload,now) {
 const pending=JSON.stringify(payload);
 return pending===state.pending?state:{...state,pending,changedAt:now};
}
export function deliveryDue(state,now,flush=false) {
 return !state.inFlight && state.pending!==null && state.pending!==state.lastSuccess && (flush || now-state.changedAt>=4000);
}
export function completedDelivery(state,sent,ok) {
 return {...state,inFlight:false,lastSuccess:ok?sent:state.lastSuccess};
}

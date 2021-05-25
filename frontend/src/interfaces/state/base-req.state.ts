export type Status = "pending" | "idle" | "fulfilled" | "failed";

export default interface BaseReqState {
  status: Status;
  error: any;
}

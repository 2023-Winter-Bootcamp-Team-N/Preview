interface ThrottleFunction {
  (func: (...args: any[]) => any, limit: number): (...args: any[]) => void;
}

declare const throttle: ThrottleFunction;
export default throttle;

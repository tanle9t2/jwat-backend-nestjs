import { Timestamp } from '../grpc/generated/google/protobuf/timestamp';

export function dateToTimestamp(date: Date): Timestamp {
  const millis = date.getTime();
  const seconds = Math.floor(millis / 1000);
  const nanos = (millis % 1000) * 1_000_000;
  return { seconds, nanos };
}

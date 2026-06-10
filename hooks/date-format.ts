import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function dateFormat(date: number) {
  return dayjs(date).format("DD MMMM YYYY");
}

export function timeAgo(date: number) {
  return dayjs(date).fromNow();
}

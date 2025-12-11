import { listRegions } from "@lib/data/regions"
import StickyNav from "./stickyNav"

export default async function Nav() {
  const regions = await listRegions()
    .then((r) => r)
    .catch(() => null)
  return <StickyNav regions={regions} />
}

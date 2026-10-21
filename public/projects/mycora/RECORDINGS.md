# Screen recordings

Figma stores these five as video fills, which the Dev Mode MCP server does not
export — `get_design_context` returns an empty node for them. Drop the files
here with these exact names and they render automatically; no code change is
needed (see `src/components/DeviceVideo/DeviceVideo.tsx`).

| File                        | Where it appears            | Figma node  |
| --------------------------- | --------------------------- | ----------- |
| `owner-dashboard.mp4`       | Orchard Owner Screens, 1st  | 1384:3000   |
| `owner-status-by-block.mp4` | Orchard Owner Screens, 2nd  | 1384:3014   |
| `owner-inventory.mp4`       | Orchard Owner Screens, 3rd  | 1384:3039   |
| `owner-daily-summary.mp4`   | Daily Summary (phone)       | 1384:3056   |
| `hunter-1..4.mp4`           | Hunter Screens (4 phones)   | 1384:3309-12|

MP4 (H.264) or WebM. They play muted, looping and inline.

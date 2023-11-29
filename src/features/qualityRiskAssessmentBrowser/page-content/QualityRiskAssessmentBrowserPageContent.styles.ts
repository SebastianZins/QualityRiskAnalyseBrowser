import { createStyles } from '@mantine/styles';

export default createStyles(() => ({
  appLayoutWrapper: {
    display: "grid",
    gridTemplateAreas: `
        'TreeCard TreeCard TreeCard TreeCard TreeCard'
        'TreeCard TreeCard TreeCard TreeCard TreeCard'
        'TreeCard TreeCard TreeCard TreeCard TreeCard'
        'SelectorCard DateStats DateStats DateStats HistogramStats'
        'SelectorCard DateStats DateStats DateStats HistogramStats'
       `,
    gap: "10px",
    gridAutoRows: "calc((100vh - (60px + 4*10px + 2*20px))/5)",
  },
  stackLayoutWrapper: {
    display: "grid",
    gridTemplateAreas: `
        'Color Text Text Text Text'
       `,
    columnGap:"8px",
    gridTemplateColumns: " 10px auto auto auto auto",
  },
}));


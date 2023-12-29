import { Box } from '@mui/material';

export function a11yProps(index: number, name = 'mui') {
  return {
    id: `${name}-tab-${index}`,
    'aria-controls': `${name}-tabpanel-${index}`,
  };
}

export default function TabPanel(props: any) {
  const { children, value, index, box, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box {...other}>{children}</Box>}
    </div>
  );
}

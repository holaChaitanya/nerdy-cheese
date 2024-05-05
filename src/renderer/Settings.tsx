import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Settings() {
  return (
    <div>
      <p>This is Setting</p>
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </div>
  );
}

export default Settings;

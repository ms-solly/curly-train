import * as React from 'react';
import Switch from '@mui/material/Switch';

interface SwitchbtnProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Switchbtn({ checked, onChange }: SwitchbtnProps) {
  return (
    <Switch
      {...label}
      checked={checked}
      onChange={onChange}
    />
  );
}

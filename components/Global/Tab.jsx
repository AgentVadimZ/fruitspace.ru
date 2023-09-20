import { styled } from '@mui/system';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import {Button} from "@mui/material";


const Tab = styled(TabUnstyled)`
  font-family: Helvetica, serif;
  color: white;
  cursor: pointer;
  font-size: 12pt;
  font-weight: normal;
  background-color: transparent;
  width: 6rem;
  padding: 10px;
  margin: 4px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  min-width: 4rem;

  &:hover {
    background-color: var(--btn-hover);
  }

  &:focus {
    color: #fff;
    outline: none;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: var(--primary-color);
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: Helvetica, serif;
  font-size: 10pt;
  border: var(--primary-color) 1px solid;
  border-radius: 12px;
  padding: 12px;
`;

const TabsList = styled(TabsListUnstyled)`
  background-color: transparent;
  width: fit-content;
  border: var(--primary-color) 1px solid;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const TabButton = styled(Button)`
  background-color: var(--primary-color);
  border-radius: 8px;
  color: white;
  padding: 7px;
  margin: 4px;
  display: flex;
  justify-content: center;
`;


export {Tab, TabPanel, TabsList, TabButton}
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
  font-size: 10pt;
  font-weight: bold;
  background-color: transparent;

  border-radius: 4px;
  //width: 6rem;
  padding: 4px 8px;
  margin: 4px 1px;
  border: none;
  display: flex;
  justify-content: center;
  //min-width: 4rem;

  &:hover {
    background-color: var(--btn-hover);
  }
  
  &:first-of-type {
    margin: 4px 1px 4px 4px;
  }

  &:last-child {
    margin: 4px 4px 4px 1px;
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
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  margin-left: auto;
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
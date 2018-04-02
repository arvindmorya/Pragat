import { StackNavigator, DrawerNavigator } from "react-navigation";

import MyPlanScreen from "./../screens/MyPlanScreen";
import DashBoardScreen from "./../screens/DashBoardScreen";
import DrawerContent from "./DrawerContent";

export const DrawerStack = DrawerNavigator(
  {
    dashBoard: { screen: DashBoardScreen },
    myPlan: { screen: MyPlanScreen }
  },
  {
    drawerPosition: "right",
    contentComponent: DrawerContent, 
  }, 
);

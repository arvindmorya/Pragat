import { StackNavigator, DrawerNavigator, } from "react-navigation";

import MyPlanScreen from "./../screens/MyPlanScreen";
import MyClassesScreen from "./../screens/MyClassesScreen";
import DashBoardScreen from "./../screens/DashBoardScreen";
import DrawerContent from "./DrawerContent";

export const DrawerStack = DrawerNavigator(
  {
    dashBoard: { screen: DashBoardScreen },
    myPlan: { screen: MyPlanScreen },
    myClasses: { screen: MyClassesScreen }
  },
  {
    drawerPosition: "right",
    contentComponent: DrawerContent, 
  }, 
);

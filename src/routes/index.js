import * as React from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ImageComponent} from '_elements';
import {RouteNames} from '_routeName';
import {
  SplashScreen,
  Profile,
  CorporateAccount,
  CurrentTrip,
  Login,
  TripDetails,
  PatientDetails,
  ReviewDetails,
  ReviewTripDetails,
} from '_screens';
import {light} from 'src/components/theme/colors';
import {navigationRef} from './NavigationService';
import ChangePassword from 'src/screens/profile/change-password';
import Notifications from 'src/screens/notifications';
import {useSelector} from 'react-redux';
import {API_URL} from 'src/utils/config';
import {strictValidObjectWithKeys} from 'src/utils/commonUtils';
import io from 'socket.io-client';
import {onDisplayNotification} from 'src/utils/mobile-utils';
import CompletedTrips from 'src/screens/completed-trips';
import Capabilities from 'src/screens/create-trip/capabilities';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PlanningStack() {
  const {navigate} = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Create New Trip',
          headerTitleAlign: 'center',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigate(RouteNames.NOTIFICATION_SCREEN)}>
          //     <ImageComponent
          //       name="notiofication_icon"
          //       height={22}
          //       width={22}
          //       color={light.secondary}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
        name={RouteNames.PLANNED_UNIT_SCREEN}
        component={CorporateAccount}
      />
      <Stack.Screen
        options={{
          title: 'Transport Details',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.CAPABILITY_SCREEN}
        component={Capabilities}
      />
      <Stack.Screen
        options={{
          title: 'Patient Details',
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
        name={RouteNames.PATIENT_SCREEN}
        component={PatientDetails}
      />
      <Stack.Screen
        options={{
          title: 'Trip Details',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.TRIP_DETAILS_SCREEN}
        component={TripDetails}
      />
      <Stack.Screen
        options={{
          title: 'Trip created successfully',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerBackVisible: false,
          gestureEnabled: false,
        }}
        name={RouteNames.REVIEW_DETAILS_SCREEN}
        component={ReviewDetails}
      />

      <Stack.Screen
        options={{
          title: 'Notifications',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.NOTIFICATION_SCREEN}
        component={Notifications}
      />
    </Stack.Navigator>
  );
}

function CurrentTripStack() {
  const {navigate} = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Trips',
          headerTitleAlign: 'center',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigate(RouteNames.NOTIFICATION_SCREEN)}>
          //     <ImageComponent
          //       name="notiofication_icon"
          //       height={22}
          //       width={22}
          //       color={light.secondary}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
        name={RouteNames.CURRENT_UNIT_SCREEN}
        component={CurrentTrip}
      />
      <Stack.Screen
        options={{
          title: 'Unit Details',
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
        }}
        name={RouteNames.PATIENT_SCREEN}
        component={PatientDetails}
      />
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.NOTIFICATION_SCREEN}
        component={Notifications}
      />
      <Stack.Screen
        options={{
          title: 'Trip Details',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.REVIEW_TRIP_DETAILS_SCREEN}
        component={ReviewTripDetails}
      />
    </Stack.Navigator>
  );
}
function ProfileStack() {
  const {navigate} = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'User Profile',
          headerTitleAlign: 'center',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigate(RouteNames.NOTIFICATION_SCREEN)}>
          //     <ImageComponent
          //       name="notiofication_icon"
          //       height={22}
          //       width={22}
          //       color={light.secondary}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
        name={RouteNames.USER_ACTIONS_SCREEN}
        component={Profile}
      />
      <Stack.Screen
        options={{
          title: 'Change Password',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.CHANGE_PASSWORD_SCREEN}
        component={ChangePassword}
      />
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.NOTIFICATION_SCREEN}
        component={Notifications}
      />
    </Stack.Navigator>
  );
}

function CompletedTripStack() {
  const {navigate} = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'Completed Trips',
          headerTitleAlign: 'center',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => navigate(RouteNames.NOTIFICATION_SCREEN)}>
          //     <ImageComponent
          //       name="notiofication_icon"
          //       height={22}
          //       width={22}
          //       color={light.secondary}
          //     />
          //   </TouchableOpacity>
          // ),
        }}
        name={RouteNames.TRANSPORT_SCREEN}
        component={CompletedTrips}
      />
      <Stack.Screen
        options={{
          title: 'Notifications',
          headerBackTitle: 'Back',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.NOTIFICATION_SCREEN}
        component={Notifications}
      />
    </Stack.Navigator>
  );
}

const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'CurrentUnitStack') {
            iconName = focused ? 'home_selected' : 'home';
          } else if (route.name === 'PlannedStack') {
            iconName = focused ? 'planning_selected' : 'planning';
          } else if (route.name === 'ProfileStack') {
            iconName = focused ? 'profile_selected' : 'profile';
          } else if (route.name === 'TransportStack') {
            iconName = focused ? 'delivery_selected' : 'delivery';
          }

          // You can return any component that you like here!
          return (
            <ImageComponent
              name={iconName}
              height={35}
              width={35}
              color={!focused ? '#B5B5B7' : null}
            />
          );
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        name={RouteNames.CURRENT_UNIT_STACK_SCREEN}
        component={CurrentTripStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        name={RouteNames.PLANNED_STACK_SCREEN}
        component={PlanningStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        name={RouteNames.TRANSPORT_STACK_SCREEN}
        component={CompletedTripStack}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
        name={RouteNames.PROFILE_STACK_SCREEN}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: light.secondary,
  },
};
function Routes() {
  const user = useSelector((state) => state.auth.login.profile);
  React.useEffect(() => {
    const socket = io(API_URL.BASE_URL);
    if (strictValidObjectWithKeys(user) && user.driver_id) {
      socket.on(`notification_${user.driver_id}`, (msg) => {
        onDisplayNotification(msg);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={RouteNames.SPLASH_SCREEN}
          component={SplashScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={RouteNames.LOGIN_SCREEN}
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={RouteNames.HOME_SCREEN}
          component={HomeStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;

// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./store";
// import Content from "../src/components/Admin/Content";
// import Sidebar from "./components/Admin/Sidebar";
// import Navbar from "./components/Admin/Navbar";
// import RegisterAdmin from "./components/Admin/RegisterAdmin";
// import AllAdmins from "./components/Admin/AllAdmins";
// import AllUsers from "./components/Admin/AllUsers";
// import AllTutions from "./components/Admin/AllTutions";
// import TutorAppliedForTutions from "./components/Admin/TutorAppliedForTutions";
// import TutionById from "./components/Admin/TutionById";
// import TutorProfiles from "./components/Admin/TutorProfiles";
// import TutorProfile from "./components/Admin/TutorProfile";
// import Privateroute from "./components/Admin/Privateroute";
// import { HashRouter } from "react-router-dom"; //for refreshing browser ulr issue
// function Admin() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <HashRouter>
//           <div className="Admin">
//             <Sidebar />

//             {/* Content Wrapper */}
//             {/* <div id="content-wrapper" className="d-flex flex-column"> */}
//             {/* Main Content */}
//             {/* <div id="content">
//                 <Navbar />

//               </div> */}
//             {/* </div> */}

//             <Route exact path="/create-admin" component={RegisterAdmin} />

//             <Route exact path="/all-admins" component={AllAdmins} />

//             <Route exact path="/all-users" component={AllUsers} />

//             <Route exact path="/all-tutions" component={AllTutions} />

//             <Route
//               exact
//               path="/applied-tutions"
//               component={TutorAppliedForTutions}
//             />

//             <Route exact path="/" component={Content} />

//             <Route exact path="/get-tution-id/:id" component={TutionById} />

//             <Route exact path="/tutor-profiles" component={TutorProfiles} />

//             <Route
//               exact
//               path="/tutor-profile/:handle"
//               component={TutorProfile}
//             />
//           </div>
//         </HashRouter>
//       </Router>
//     </Provider>
//   );
// }
// export default Admin;

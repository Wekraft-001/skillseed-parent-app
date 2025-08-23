import { Routes, Route } from "react-router-dom";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./theme/ThemeProvider";
import { SidebarProvider } from "./context/SidebarContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddChild from "./pages/AddChild";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import ChildCareerProfile from "./pages/ChildCareerProfile";
import LearningActivities from "./pages/LearningActivities";
import MentorshipSessions from "./pages/MentorshipSessions";
import ScheduledExcursions from "./pages/ScheduledExcursions";
import ReflectionsAndFeedback from "./pages/ReflectionsAndFeedback";
import ParentalControlPrivacy from "./pages/ParentalControlPrivacy";
import ParentResources from "./pages/ParentResources";
import PaymentVerify from "./pages/PaymentVerify";

const App = () => (
  <ThemeProvider>
    <TooltipProvider>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="add-child" element={<AddChild />} />
            <Route path="/payment-verify" element={<PaymentVerify />} />
            <Route path="business-tools" element={<NotFound />} />
            <Route path="support" element={<NotFound />} />
            <Route path="more" element={<NotFound />} />
            <Route
              path="child-career-profile/:childId"
              element={<ChildCareerProfile />}
            />
            <Route
              path="learning-activities"
              element={<LearningActivities />}
            />
            <Route
              path="mentorship-sessions"
              element={<MentorshipSessions />}
            />
            <Route
              path="scheduled-excursions"
              element={<ScheduledExcursions />}
            />
            <Route path="reflections" element={<ReflectionsAndFeedback />} />
            <Route path="reports" element={<Reports />} />
            <Route
              path="parental-controls"
              element={<ParentalControlPrivacy />}
            />
            <Route path="parent-resources" element={<ParentResources />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;

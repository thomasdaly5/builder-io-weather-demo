import React from "react";
import AppLayout from "@cloudscape-design/components/app-layout";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Header from "@cloudscape-design/components/header";
import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <AppLayout
      navigationHide
      toolsHide
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="The page you're looking for doesn't exist"
            >
              Page Not Found
            </Header>
          }
        >
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center space-y-8 max-w-md">
              <div className="space-y-4">
                <div className="text-8xl font-light text-cloudscape-blue-500">
                  404
                </div>
                <h1 className="text-cloudscape-heading-l text-foreground">
                  Page Not Found
                </h1>
                <p className="text-cloudscape-body-m text-muted-foreground">
                  Sorry, we couldn't find the page you're looking for. It might
                  have been moved, deleted, or you entered the wrong URL.
                </p>
              </div>

              <SpaceBetween direction="horizontal" size="m">
                <Button
                  onClick={handleGoBack}
                  variant="normal"
                  iconName="arrow-left"
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleGoHome}
                  variant="primary"
                  iconName="home"
                >
                  Go to Weather Dashboard
                </Button>
              </SpaceBetween>

              <div className="pt-4 border-t border-border">
                <p className="text-cloudscape-body-s text-muted-foreground">
                  If you believe this is an error, please contact support.
                </p>
              </div>
            </div>
          </div>
        </ContentLayout>
      }
    />
  );
};

export default NotFound;

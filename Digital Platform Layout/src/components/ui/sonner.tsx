import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "bg-white border-brown/20",
          title: "text-brown",
          description: "text-muted-foreground",
          actionButton: "bg-brown text-white",
          cancelButton: "bg-secondary text-secondary-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

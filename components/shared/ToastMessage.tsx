"use client";

import { Toast } from "../ui/toast";
import { useToast } from "../ui/use-toast";

const ToastMessage = () => {
  const { toast } = useToast();
  return (
    <div>
      <Toast title="hi there" />
    </div>
  );
};
export default ToastMessage;

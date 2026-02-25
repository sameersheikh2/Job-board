import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { closeComingSoon } from "../../features/uiSlice/uiSlice";

const ComingSoonDialog = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.comingSoonOpen);

  const handleClose = () => {
    dispatch(closeComingSoon());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Coming Soon!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/brick-by-brick.gif"
            alt="Building brick by brick"
            className="w-full max-w-xs h-56 object-cover rounded-lg"
          />
          <DialogDescription>
            We are still working on this feature. Please stay tuned for the next
            update!
          </DialogDescription>
          <Button onClick={handleClose} className="w-full">
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonDialog;

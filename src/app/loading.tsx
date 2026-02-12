import { Icon } from "@iconify/react";

export default function Loading() {
    return (
      <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center bg-white z-50">
        <Icon
            icon="eos-icons:three-dots-loading"
            width={100}
            height={100}
            className="text-gray-900"
          />
       
      </div>
    );
  }


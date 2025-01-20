import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <Link href="/api/auth/logout" className={className}>
      <Text
        size="md"
        className="!text-danger flex items-center"
        withoutDefaultClass
      >
        <Button variant="empty" className="flex items-center !px-0">
          {" "}
          <IoLogOutOutline className="text-xl mr-2" />
          Logout
        </Button>
      </Text>
    </Link>
  );
}

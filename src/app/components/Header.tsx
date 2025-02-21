interface HeaderProps {
  pageName: string;
}

export default function Header({ pageName }: HeaderProps) {

  return (
    <div className="w-full flex justify-between border-b bg-white sticky top-0 z-30 md:z-50 shadow-sm">
      <h3 className="text-gray-600 text-md font-Jost ms-6 my-4">{pageName}</h3>
      <h3 className="text-gray-600 text-md font-Jost me-6 my-4">
        STUDIO VALENTE
      </h3>
    </div>
  );
}

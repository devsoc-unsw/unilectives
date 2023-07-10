import Image from "next/image";
import waves from "../../../assets/navbar.svg";
import { notFound } from "next/navigation";
import { get } from "@/utils/request";
import { Suspense } from "react";
import UserPageContent from "@/components/UserPageContent/UserPageContent";

export default async function UserPage({
  params,
}: {
  params: {
    [key: string]: string;
  };
}) {
  // const { user } = await get(`/user/${params.zid}`);

  // if (!user) notFound();

  // Dummy data
  const reviews = [
    {
      courseCode: "COMP1511",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit libero scelerisque malesuada convallis. Vestibulum in accumsan mi. Phasellus in vestibulum urna, vitae placerat nibh. Pellentesque id est molestie, mattis eros quis, hendrerit urna. Duis ut interdum mi, et vehicula nisi. Mauris eu mauris tempor enim mattis sagittis. Sed vel pretium magna. Donec non tincidunt odio. Etiam eu tortor imperdiet, placerat quam eu, porttitor nunc. Integer euismod, nibh vel gravida tempus, dolor dui tincidunt nisl, vitae feugiat erat orci sit amet ligula. Praesent vitae turpis sit amet quam semper convallis sit amet vel dolor. In nisl tellus, finibus sed turpis vitae, varius vestibulum ante. Nunc tempor nisi laoreet, blandit tortor non, tincidunt nisl.",
      overallRating: 4.5,
    },
    {
      courseCode: "COMP1511",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit libero scelerisque malesuada convallis. Vestibulum in accumsan mi. Phasellus in vestibulum urna, vitae placerat nibh. Pellentesque id est molestie, mattis eros quis, hendrerit urna. Duis ut interdum mi, et vehicula nisi. Mauris eu mauris tempor enim mattis sagittis. Sed vel pretium magna. Donec non tincidunt odio. Etiam eu tortor imperdiet, placerat quam eu, porttitor nunc. Integer euismod, nibh vel gravida tempus, dolor dui tincidunt nisl, vitae feugiat erat orci sit amet ligula. Praesent vitae turpis sit amet quam semper convallis sit amet vel dolor. In nisl tellus, finibus sed turpis vitae, varius vestibulum ante. Nunc tempor nisi laoreet, blandit tortor non, tincidunt nisl.",
      overallRating: 3.9,
    },
    {
      courseCode: "COMP1511",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit libero scelerisque malesuada convallis. Vestibulum in accumsan mi. Phasellus in vestibulum urna, vitae placerat nibh. Pellentesque id est molestie, mattis eros quis, hendrerit urna. Duis ut interdum mi, et vehicula nisi. Mauris eu mauris tempor enim mattis sagittis. Sed vel pretium magna. Donec non tincidunt odio. Etiam eu tortor imperdiet, placerat quam eu, porttitor nunc. Integer euismod, nibh vel gravida tempus, dolor dui tincidunt nisl, vitae feugiat erat orci sit amet ligula. Praesent vitae turpis sit amet quam semper convallis sit amet vel dolor. In nisl tellus, finibus sed turpis vitae, varius vestibulum ante. Nunc tempor nisi laoreet, blandit tortor non, tincidunt nisl.",
      overallRating: 3.9,
    },
    {
      courseCode: "COMP1511",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit libero scelerisque malesuada convallis. Vestibulum in accumsan mi. Phasellus in vestibulum urna, vitae placerat nibh. Pellentesque id est molestie, mattis eros quis, hendrerit urna. Duis ut interdum mi, et vehicula nisi. Mauris eu mauris tempor enim mattis sagittis. Sed vel pretium magna. Donec non tincidunt odio. Etiam eu tortor imperdiet, placerat quam eu, porttitor nunc. Integer euismod, nibh vel gravida tempus, dolor dui tincidunt nisl, vitae feugiat erat orci sit amet ligula. Praesent vitae turpis sit amet quam semper convallis sit amet vel dolor. In nisl tellus, finibus sed turpis vitae, varius vestibulum ante. Nunc tempor nisi laoreet, blandit tortor non, tincidunt nisl.",
      overallRating: 4.5,
    },
    {
      courseCode: "COMP1511",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit libero scelerisque malesuada convallis. Vestibulum in accumsan mi. Phasellus in vestibulum urna, vitae placerat nibh. Pellentesque id est molestie, mattis eros quis, hendrerit urna. Duis ut interdum mi, et vehicula nisi. Mauris eu mauris tempor enim mattis sagittis. Sed vel pretium magna. Donec non tincidunt odio. Etiam eu tortor imperdiet, placerat quam eu, porttitor nunc. Integer euismod, nibh vel gravida tempus, dolor dui tincidunt nisl, vitae feugiat erat orci sit amet ligula. Praesent vitae turpis sit amet quam semper convallis sit amet vel dolor. In nisl tellus, finibus sed turpis vitae, varius vestibulum ante. Nunc tempor nisi laoreet, blandit tortor non, tincidunt nisl.",
      overallRating: 1,
    },
    {
      courseCode: "COMP1511",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit libero scelerisque malesuada convallis. Vestibulum in accumsan mi. Phasellus in vestibulum urna, vitae placerat nibh. Pellentesque id est molestie, mattis eros quis, hendrerit urna. Duis ut interdum mi, et vehicula nisi. Mauris eu mauris tempor enim mattis sagittis. Sed vel pretium magna. Donec non tincidunt odio. Etiam eu tortor imperdiet, placerat quam eu, porttitor nunc. Integer euismod, nibh vel gravida tempus, dolor dui tincidunt nisl, vitae feugiat erat orci sit amet ligula. Praesent vitae turpis sit amet quam semper convallis sit amet vel dolor. In nisl tellus, finibus sed turpis vitae, varius vestibulum ante. Nunc tempor nisi laoreet, blandit tortor non, tincidunt nisl.",
      overallRating: 1,
    },
    {
      courseCode: "COMP1511",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit libero scelerisque malesuada convallis. Vestibulum in accumsan mi. Phasellus in vestibulum urna, vitae placerat nibh. Pellentesque id est molestie, mattis eros quis, hendrerit urna. Duis ut interdum mi, et vehicula nisi. Mauris eu mauris tempor enim mattis sagittis. Sed vel pretium magna. Donec non tincidunt odio. Etiam eu tortor imperdiet, placerat quam eu, porttitor nunc. Integer euismod, nibh vel gravida tempus, dolor dui tincidunt nisl, vitae feugiat erat orci sit amet ligula. Praesent vitae turpis sit amet quam semper convallis sit amet vel dolor. In nisl tellus, finibus sed turpis vitae, varius vestibulum ante. Nunc tempor nisi laoreet, blandit tortor non, tincidunt nisl.",
      overallRating: 4.5,
    },
  ];

  return (
    <div className="isolate relative">
      {/* Waves */}
      <div className="absolute w-full top-0 -z-10">
        <Image className="w-full h-full object-cover" src={waves} alt="Waves" />
      </div>
      <UserPageContent reviews={reviews} />
    </div>
  );
}

import Image from "next/image";

type SellIntroCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  text: string;
};

export default function SellIntroCard({ imageSrc, imageAlt, title, text }: SellIntroCardProps) {
  return (
    <div className="sellIntroCard">
      <div className="sellIntroMedia">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className="sellIntroImg"
          priority={false}
        />
      </div>

      <div className="sellIntroBody">
        <h2 className="sellIntroTitle">{title}</h2>
        <p className="sellIntroText">{text}</p>
      </div>
    </div>
  );
}
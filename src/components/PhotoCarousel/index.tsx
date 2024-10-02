import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

type PhotoCarouselProps = {
  images: string[];
};

export default function PhotoCarousel({ images }: PhotoCarouselProps) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1 mx-8 my-4">
              <Card className="h-[24rem] overflow-hidden border-none">
                <CardContent className="flex items-center justify-center h-full bg-slate-400 rounded-sm w-full relative p-0">
                  <Image
                    src={src}
                    alt={`imagem do casal-${index}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 text-accent-foreground disabled:hidden" />
      <CarouselNext className="absolute right-0 text-accent-foreground disabled:hidden" />
    </Carousel>
  );
}

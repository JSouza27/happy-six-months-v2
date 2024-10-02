'use client';

import SignIn from '@/components/SignIn';
import Main from '@/components/Main';
import StepCard from '@/components/StepCard';

export type Data = {
  img: string;
  title: string;
  id: string;
  location: string;
  playlist: string;
};

export type CurrentSlideData = {
  data: Data;
  index: number;
};

export default function Login() {
  return (
    <Main>
      <StepCard>
        <p>
          Se não existe vida fora da Terra, o universo é um desperdício de
          espaço
          <br />
          Mas as estrelas apareceram na minha frente quando eu recebi seu abraço
          <br />
          Foi um tanto quanto muito mágico
          <br />
          Entro no buraco negro só pra voltar e ver seu sorriso lá no passado
          <br />
          Fazendo minha mente flutuar
          <br />
          Mas sei lá se existe vida fora da Terra, disso eu não sei
          <br />
          Mas eu quero aproveitar cada momento com você
          <br />
          Porque a vida é sem replay
          <br />
          Navegando no oceano dos seus olhos, tenho certeza que eu velejei
          <br />
          Garota, você é interestelar, nem a estrela mais linda tem a luz que cê
          tem
        </p>
        <p>
          Você adicionou música em minha vida
          <br />
          Agora toda vez que ouço essa música me apaixono por você novamente
          rsrs
          <br />
        </p>
        <p>Essa é só uma lembrança desses 6 meses em que estamos juntos</p>
        <div className="flex flex-col items-center gap-2">
          <p>Ah para curtir a experiência completa, faça o login abaixo</p>
          <SignIn />
        </div>
      </StepCard>
    </Main>
  );
}

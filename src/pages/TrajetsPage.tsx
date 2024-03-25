import { useEffect, useState } from "react";

import TrajetsConducteur from "@/components/trajetsConducteur";
import TrajetsPassager from "@/components/trajetsPassager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listeInscription } from "@/services/apiInscription";
import { Trajet } from "@/types/trajet";

const TrajetsPage = () => {
  const [inscriptionsConducteur, setInscriptionsConducteur] = useState<
    Trajet[]
  >([]);
  const [inscriptionsPassager, setInscriptionsPassager] = useState<Trajet[]>(
    []
  );

  useEffect(() => {
    const fetchInscriptions = async () => {
      const response = await listeInscription();
      console.log(response);
      setInscriptionsConducteur(response.inscriptionsConducteur);
      setInscriptionsPassager(response.inscriptionsPassager);
    };
    fetchInscriptions();
  }, []);

  return (
    <div className="md:mt-16 flex flex-col items-center">
      <Tabs defaultValue="trajets_passager" className="w-10/12">
        <TabsList className="w-full bg-primary-dark py-6 my-8">
          <TabsTrigger
            value="trajets_passager"
            className="w-1/2 data-[state=active]:bg-ternary-dark text-primary-light/50 data-[state=active]:text-primary-light py-2"
          >
            Passager
          </TabsTrigger>
          <TabsTrigger
            value="trajets_conducteur"
            className="w-1/2 data-[state=active]:bg-ternary-dark text-primary-light/50 data-[state=active]:text-primary-light"
          >
            Conducteur
          </TabsTrigger>
        </TabsList>
        <TabsContent value="trajets_passager">
          <TrajetsPassager inscriptions={inscriptionsPassager} />
        </TabsContent>
        <TabsContent value="trajets_conducteur">
          <TrajetsConducteur inscriptions={inscriptionsConducteur} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrajetsPage;

import { useEffect, useState } from "react";

import TrajetsConducteur from "@/components/TrajetConducteur";
import TrajetsPassager from "@/components/TrajetsPassager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { listeInscription } from "@/services/apiInscription";
import { InscriptionConducteur } from "@/types/inscription";
import { Trajet } from "@/types/trajet";

const TrajetsPage = () => {
  const [inscriptionsConducteur, setInscriptionsConducteur] = useState<
    InscriptionConducteur[]
  >([]);
  const [inscriptionsPassager, setInscriptionsPassager] = useState<Trajet[]>(
    []
  );

  useEffect(() => {
    const fetchInscriptions = async () => {
      const response = await listeInscription();
      setInscriptionsConducteur(response.inscriptionsConducteur);
      setInscriptionsPassager(response.inscriptionsPassager);
    };
    fetchInscriptions();
  }, []);

  return (
    <div className="pb-16 md:pb-0 md:pt-16 flex flex-col items-center h-full">
      <Tabs defaultValue="trajets_passager" className="w-10/12 h-full">
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

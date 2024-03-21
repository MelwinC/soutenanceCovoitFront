import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { capitalize } from "@/lib/utils";
import { signIn, signUp } from "@/services/apiAuth";
import { getPersonne } from "@/services/apiPersonne";
import { isLoggedIn, setCookie } from "@/services/authService";
import { Compte } from "@/types/compte";
import { CheckCircle } from "lucide-react";

const AuthPage = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [variant, setVariant] = useState("login");
  const [compte, setCompte] = useState<Compte | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      if (!pseudo || !password) {
        setError("Veuillez remplir tous les champs !");
      } else {
        const response = await signIn({ pseudo, password });
        if ("message" in response) {
          setError("Login ou mot de passe incorrect");
        } else {
          setCompte(response);
        }
        console.log(response);
      }
    } catch (error) {
      console.log("erreur : " + error);
    }
  }, [pseudo, password]);

  const register = useCallback(async () => {
    try {
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas !");
      } else {
        const response = await signUp({
          pseudo,
          password,
        });
        if (response.message === "Veuillez remplir tous les champs !") {
          setError("Veuillez remplir tous les champs !");
        } else if (response.message === "Le login est déjà attribué !") {
          setError("Le login est déjà attribué !");
        } else if (response.message === "NOK") {
          setError("Erreur lors de l'inscription !");
        } else if (password !== confirmPassword) {
          setError("Les mots de passe ne correspondent pas !");
        } else {
          toast({
            description: (
              <span className="flex">
                <CheckCircle style={{ color: "green" }} />
                <p className="pl-4 text-[1rem]">Compte créé avec succès !</p>
              </span>
            ),
            duration: 1000,
            variant: "success",
          });
          login();
        }
      }
    } catch (error) {
      console.log("erreur : " + error);
    }
  }, [pseudo, password, confirmPassword, login, toast]);

  useEffect(() => {
    if (isLoggedIn()) navigate("/");
    if (compte != null) {
      const authentified = async () => {
        if (compte.accessToken && compte.roles) {
          setCookie("token", compte.accessToken);
          setCookie("roles", compte.roles.join(","));
          const response = await getPersonne();
          if ("personne" in response) {
            toast({
              description: (
                <span className="flex">
                  <CheckCircle style={{ color: "green" }} />
                  <p className="pl-4 text-[1rem]">
                    Connexion réussie, bienvenue{" "}
                    {capitalize(response.personne.prenom)} !
                  </p>
                </span>
              ),
              duration: 2000,
              variant: "success",
            });
            navigate("/");
          }
        }
      };
      authentified();
    }
  }, [compte, navigate, toast]);

  useEffect(() => {
    setError(null);
  }, [pseudo, password, confirmPassword]);

  return (
    <div className="flex justify-center items-center bg-neutral-200 w-full h-full">
      <div className="flex justify-center w-full h-full">
        <div className="bg-ternary-dark px-16 py-16 self-center mt-2 min-w-min max-w-2xl rounded-lg w-4/5">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant === "login" ? "Connexion" : "Inscription"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              variant === "login" ? login() : register();
            }}
          >
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <div className="flex flex-col gap-4">
              <Input
                label="Pseudo"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPseudo(e.target.value)
                }
                id="pseudo"
                type="text"
                value={pseudo}
              />
              <Input
                label="Mot de passe"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                id="password"
                type="password"
                value={password}
              />
              {variant === "register" && (
                <Input
                  label="Confirmer le mot de passe"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                />
              )}
            </div>
            <Button
              type="submit"
              variant="dark"
              className="w-full mt-10 active:bg-neutral-700 active:duration-300"
            >
              {variant === "login" ? "Se connecter" : "Créer un compte"}
            </Button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center"></div>
            <p className="text-neutral-300 mt-4">
              {variant === "login"
                ? "Pas encore de compte ?"
                : "Vous possédez déjà un compte ?"}
              <span
                onClick={toggleVariant}
                className="text-primary-light ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Créer un compte" : "Se connecter"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

export interface Subsectiune {
  titlu: string;
  descriere1: string;
  descriere2?: string;
  descriere3?: string;
}

export interface Detalii {
  secțiuni: Subsectiune[];
}

export interface Solutii {
  firebaseId: string;
  id: string;
  nume: string;
  descriere: string;
  descriere_Scurta: string;
  descriere_detaliata: string;
  image_url: string;
  detalii: Detalii; // Structura detaliată a soluției
}

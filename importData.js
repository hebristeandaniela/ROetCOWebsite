import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseService.js";

const addSolutions = async () => {
    const solutions = [
        {
            id: "securitate-cibernetica",
            nume: "Securitatea Cibernetică",
            descriere: "Soluții avansate de protecție a datelor împotriva atacurilor cibernetice, pierderii sau accesului neautorizat.",
            descriere_scurta: "Protejează-ți informațiile, asigură-ți viitorul!",
            descriere_detaliata: "RO et CO Interantional S.A.  oferă soluții complete de securitate a datelor, bazate pe tehnologiile de vârf ale Fortinet și BitDefender. Securitatea datelor este esențială în protejarea informațiilor sensibile, având un impact direct asupra confidențialității, integrității și disponibilității acestora.Pentru a proteja informațiile sensibile, organizațiile pot implementa măsuri precum criptarea datelor, controalele de acces, formarea angajaților în domeniul securității cibernetice, evaluarea regulată a riscurilor, etc.",
            image_url: "https://i.postimg.cc/vmXkSTkJ/solutii-DATASECURITY.jpg",
          
            detalii: {
                secțiuni: [
                    {
                        titlu: "Consultanță în Securitate",
                        descriere1: "Evaluarea riscurilor cibernetice și analiza vulnerabilităților.",
                        descriere2: ""
                    },
                    {
                        titlu: "Planificarea și Designul Implementării",
                        descriere1: "Arhitectura Securității: Proiectarea unei arhitecturi care integrează produsele Fortinet și BitDefender pentru a asigura o protecție holistică.",
                        descriere2: "Politici de Securitate: Stabilirea politicilor de utilizare și acces la date, precum și reguli de securitate pentru rețea."
                    },
                    {
                        titlu: "Implementarea Tehnică",
                        descriere1: "Instalarea Echipamentelor: Instalarea și configurarea hardware-ului Fortinet, cum ar fi firewall-uri și appliance pentru filtrarea email-ului.",
                        descriere2: "Configurarea Software-ului: Instalarea și configurarea soluțiilor software de la BitDefender pe endpoint-uri și servere."
                    },
                    {
                        titlu: "Implementarea Tehnică (continuare)",
                        descriere1: "Integrarea Sistemelor: Asigurarea că soluțiile de la Fortinet și BitDefender comunică eficient între ele, pentru o securitate coordonată.",
                        descriere2: ""
                    },
                    {
                        titlu: "Training și Conștientizare",
                        descriere1: "Formarea Angajaților: Organizarea de sesiuni de instruire pentru angajați privind utilizarea corectă a soluțiilor de securitate și conștientizarea atacurilor cibernetice.",
                        descriere2: "Proceduri de Răspuns: Dezvoltarea unor planuri de răspuns la incidente pentru a gestiona potențialele breșe de securitate."
                    },
                    {
                        titlu: "Monitorizare și Mentenanță",
                        descriere1: "Monitorizare Continuă: Utilizarea funcționalităților de monitorizare 24/7 pentru a detecta și reacționa rapid la incidentele de securitate.",
                        descriere2: "Actualizări Regulate: Asigurarea că toate soluțiile sunt actualizate la cele mai recente versiuni, inclusiv patch-uri de securitate."
                    }
                ]
            }
        },
        {
            id: "data-center",
            nume: "Data Center",
            descriere:"Oferim infrastructură performantă pentru stocarea, gestionarea și securizarea datelor critice ale afacerii tale.",
            descriere_scurta: "Infrastructură performantă, soluții inteligente!",
            descriere_detaliata: "Un data center reprezintă o parte vitală a ecosistemului IT al unei organizații, contribuind la eficiența operațiunilor, acoperirea nevoilor de stocare și procesare a datelor, precum și asigurarea securității informațiilor. Pregătirea și implementarea corectă a unui data center pot transforma modul în care o organizație își gestionează datele și tehnologia, facilitând o mai bună adaptare la schimbările rapide din mediul digital.RO et CO  International S.A.va sta la dispozitie cu un set diversificat de instrumente pentru construirea unor soluții innovative, si venim in sprijinul afacerilor dumneavoastra în transformarea digitală prin soluții IT robuste și ADAPTATE nevoilor specifice. Astfel, oferim soluții complete pentru infrastructura IT, bazate pe tehnologiile de vârf ale Fujitsu, Synology, Arcserve, dar fara a ne limitat doar la acestia, și soluții de virtualizare diverse. Oferim fiabilitate, scalabilitate și securitate pentru afacerea ta.",
            image_url: "https://i.postimg.cc/4NJtX3SL/solutii-DATACENTER.jpg",
          
            detalii: {
                secțiuni: [
                    {
                        titlu: "Consultanță în Proiectare și Dimensionare", 
                        descriere1: "Analiza cerințelor organizației pentru a determina specificațiile tehnice necesare" ,
                        descriere2: "Proiectarea arhitecturii tehnice a data center-ului, inclusiv alegerea serverelor, soluțiilor de stocare și echipamentelor de rețea" },

                    {
                        titlu: "Evaluarea Infrastructurii Existente",
                        descriere1: "Analiza infrastructurii IT curente pentru a identifica punctele slabe și oportunitățile de îmbunătățire",
                        descriere2: "Recomandări privind optimizarea sau înlocuirea echipamentelor existente"
                    },

                    {
                        titlu: "Planificare de Capacitate",
                        descriere1: "Estimarea nevoilor de capacitate pe termen scurt și lung pentru a asigura scalabilitate",
                        descriere2: "Crearea unui plan de extindere bazat pe creșterea previzionată a utilizării resurselor"
                    },
                    {
                        titlu: "Implementarea Echipamentelor și Tehnologiilor",
                        descriere1: "Instalarea hardware-ului, inclusiv servere, soluții de stocare și echipamente de rețea",
                        descriere2: "Configurarea software-ului de virtualizare, gestionarea datelor și soluțiile de securitate"
                    },

                    {
                        titlu: "Integrarea Soluțiilor de Stocare și Backup",
                        descriere1: "Configurarea sistemelor de stocare de date (ex: Fujitsu, Synology) pentru a asigura accesibilitatea și securitatea datelor.",
                        descriere2: "Implementarea soluțiilor de backup (ex: Arcserve) pentru protecția datelor critice."
                    },
                    {
                        titlu: "Virtualizare și Managementul Resurselor",
                        descriere1: "Implementarea soluțiilor de virtualizare, cum ar fi Proxmox, Microsoft Hyper-V și VMware, pentru a eficientiza utilizarea resurselor.",
                        descriere2: "Managementul și monitorizarea mediilor virtualizate."
                    },
                    {
                        titlu: "Securitate și Conformitate",
                        descriere1: "Evaluarea și implementarea măsurilor de securitate pentru protecția datelor și a infrastructurii.",
                        descriere2: "Asigurarea conformității cu reglementările specifice industriei și standardele de securitate (ex: GDPR)."
                    },
                    {
                        titlu: "Testare și Validare",
                        descriere1: "Efectuarea de teste de penetrare și simulări pentru a evalua securitatea și performanța sistemului.",
                        descriere2: "Validarea funcționalităților și a integrării sistemelor implementate."
                    },
                    {
                        titlu: "Training și Suport pentru Utilizatori",
                        descriere1: "Organizarea de sesiuni de formare pentru echipele IT și utilizatorii finali, axate pe utilizarea eficientă a noilor soluții.",
                        descriere2: "Oferirea de suport tehnic și consultanță post-implementare pentru a aborda problemele care pot apărea."
                    },
                    {
                        titlu: "Monitorizare și Mentenanță",
                        descriere1: "Implementarea soluțiilor de monitorizare pentru a urmări performanța sistemului și a preveni problemele.",
                        descriere2: "Mentenanță regulată și actualizări ale echipamentelor și software-ului pentru a asigura funcționarea optimă."
                    },
                    {
                        titlu: "Planificarea Recuperării în Caz de Dezastru",
                        descriere1: "Dezvoltarea și implementarea planurilor de recuperare în caz de dezastru pentru a asigura continuitatea afacerii.",
                        descriere2: "Testarea periodică a acestor planuri pentru a evalua eficiența și pregătirea."
                    }
       ]
            }
        },
        {
            id: "networking",
            nume: "Networking",
            descriere: "Conectivitate rapidă, sigură și scalabilă prin soluții de rețelistică personalizate, adaptate nevoilor tale și infrastructurii existente.",
            descriere_scurta: "Conectivitate de încredere, performanță optimizată!",
            descriere_detaliata: "RO et CO International S.A., cu o echipă de specialiști în rețele și soluții IT, cu experiență vastă în implementarea și gestionarea infrastructurilor de networking, oferim soluții complete de infrastructură, bazate pe tehnologiile de top Cisco. Misiunea noastra este de a sprijini afacerile clientilor nostri în crearea unui mediu de lucru conectat, eficient și sigur.",
            image_url: "https://i.postimg.cc/zXXj0p8G/solutii-NETWORK.jpg",

            detalii: {
                secțiuni: [
                    {
                        "titlu": "Consultanță și Design Rețea",
                        "descriere1": "Evaluarea nevoilor organizației și proiectarea unei arhitecturi de rețea personalizate, bazate pe echipamente Cisco, dar nelimitându-ne doar la acestea."
                    },
                    {
                        "titlu": "Implementarea Soluțiilor Cisco",
                        "descriere1": "Instalarea și configurarea echipamentelor de rețea Cisco, inclusiv:",
                        "descriere2": "Switch-uri Cisco: Soluții pentru gestionarea și optimizarea traficului de date. Routere Cisco: Asigurarea conectivității între rețele și optimizarea comunicațiilor. Puncte de Acces Cisco: Crearea de rețele wireless fiabile și rapide."
                    },
                    {
                        "titlu": "Managementul Rețelei",
                        "descriere1": "Oferirea de soluții de management al rețelei prin Cisco DNA Center pentru monitorizarea și optimizarea performanței rețelei."
                    },
                    {
                        "titlu": "Virtualizare de Rețea",
                        "descriere1": "Implementarea tehnologiilor de virtualizare Cisco, cum ar fi Cisco ACI, pentru a îmbunătăți eficiența și flexibilitatea rețelei."
                    },
                    {
                        "titlu": "Suport și Mentenanță",
                        "descriere1": "Oferirea de suport tehnic 24/7 și servicii de mentenanță pentru asigurarea funcționării optime a rețelei."
                    }
                ]
            }
        },
        {
            id: "stocare",
            nume: "Stocare date",
            descriere: "Sisteme fiabile pentru arhivare, gestionare eficientă și protecția volumelor mari de date, asigurând acces rapid și securitate maximă.",
            descriere_scurta: "Stocare inteligentă pentru datele tale critice!",
            descriere_detaliata: "Stocarea datelor este o componentă esențială pentru funcționarea eficientă a oricărei organizații, indiferent de dimensiunea sau domeniul de activitate. Organizațiile generează și utilizează cantități mari de date, inclusiv informații despre clienți, tranzacții, produse și servicii.O soluție de stocare eficientă este esențială pentru gestionarea acestor informații.RO et Co International furnizeaza si implementeaza solutii de stocare bazate pe solutiile Fujitsu, Synology, si Arcserve, dar fara a ne limita la acestia.",
            image_url: "https://i.postimg.cc/BQHq75gR/solutii-STOCARE.jpg",

            detalii: {
                secțiuni: [
                    {
                        "titlu": "Consultanță în Stocare",
                        "descriere1": "Evaluăm cerințele organizației în materie de stocare, inclusiv tipul de date, volumele de date, frecvența accesului și cerințele de securitate."
                    },
                    {
                        "titlu": "Recomandări Personalizate",
                        "descriere1": "Oferim soluții adaptate bazate pe produsele Fujitsu, Synology și Arcserve pentru a asigura eficiența și scalabilitatea."
                    },
                    {
                        "titlu": "Implementarea Soluțiilor de Stocare",
                        "descriere1": "Soluții Fujitsu",
                        "descriere2": "Instalarea și configurarea sistemelor de stocare SAN (Storage Area Network) Fujitsu, cum ar fi familia Fujitsu Eternus, care oferă performanță superioară și fiabilitate pentru medii enterprise."
                    },
                    {
                        "titlu": "Implementarea Soluțiilor de Stocare",
                        "descriere1": "Soluții Synology",
                        "descriere2": "Implementarea sistemelor NAS (Network Attached Storage) Synology, cum ar fi DiskStation și RackStation, care asigură accesibilitate ușoară, partajare a datelor și backup integrat."
                    },
                    {
                        "titlu": "Implementarea Soluțiilor de Stocare",
                        "descriere1": "Soluții Arcserve",
                        "descriere2": "Configurarea soluțiilor de backup și recuperare Arcserve, care protejează datele critice în fața pierderii sau coruperii acestora."
                    },
                    {
                        "titlu": "Migrarea Datelor",
                        "descriere1": "Facilitatea migrarii datelor de la soluțiile existente către infrastructura de stocare nouă, asigurându-ne că datele sunt transferate în siguranță și integritate."
                    },
                    {
                        "titlu": "Migrarea Datelor",
                        "descriere1": "Testarea Integrității Datelor",
                        "descriere2": "Verificarea datelor după migrare pentru a garanta că nu există pierderi sau coruperi."
                    },
                    {
                        "titlu": "Backup și Recuperare",
                        "descriere1": "Implementarea Soluțiilor de Backup Arcserve",
                        "descriere2": "Crearea și configurarea unor soluții de backup eficiente prin Arcserve pentru a asigura protecția datelor vitale."
                    },
                    {
                        "titlu": "Backup și Recuperare",
                        "descriere1": "Diverse Strategii de Backup",
                        "descriere2": "Oferim opțiuni diverse de backup, inclusiv backup local, în cloud și hibrid, pentru a se adapta nevoilor organizației."
                    },
                    {
                        "titlu": "Backup și Recuperare",
                        "descriere1": "Plănuirea Recuperării în Caz de Dezastru",
                        "descriere2": "Elaborarea de planuri de recuperare în caz de dezastru, reducând timpul necesar pentru restaurarea sistemelor în cazul unor incidente."
                    },
                    {
                        "titlu": "Managementul Datelor",
                        "descriere1": "Organizare și Clasificare",
                        "descriere2": "Implementarea unor politici de gestionare a datelor pentru a organiza, sorta și clasifica datele stocate în soluțiile Fujitsu, Synology și Arcserve."
                    },
                    {
                        "titlu": "Managementul Datelor",
                        "descriere1": "Monitorizare și Analiză",
                        "descriere2": "Monitorizarea performanței soluțiilor de stocare pentru a identifica și rezolva proactiv problemele."
                    },
                    {
                        "titlu": "Securitate și Conformitate",
                        "descriere1": "Implementarea Măsurilor de Securitate",
                        "descriere2": "Configurarea sistemelor Fujitsu și Synology cu măsuri de securitate avansate, inclusiv criptarea datelor și controlul accesului."
                    },
                    {
                        "titlu": "Securitate și Conformitate",
                        "descriere1": "Evaluarea Conformității",
                        "descriere2": "Asigurarea respectării reglementărilor privind protecția datelor, inclusiv GDPR, prin soluțiile oferite."
                    },
                    {
                        "titlu": "Suport Tehnic și Mentenanță",
                        "descriere1": "Suport Tehnic 24/7",
                        "descriere2": "Oferim suport continuu pentru a soluționa rapid problemele cu care se confruntă utilizatorii în gestionarea soluțiilor de stocare."
                    },
                    {
                        "titlu": "Suport Tehnic și Mentenanță",
                        "descriere1": "Mentenanță Preventivă",
                        "descriere2": "Realizăm întreținerea regulată a echipamentelor și a soluțiilor de stocare pentru a asigura funcționarea optimă și prevenirea eventualelor defecțiuni."
                    }
                ]
            }
        },// Adaugă mai multe SEC;IUNI aici, după nevoie
    ];

    for (const solution of solutions) {
        const docRef = doc(collection(db, "solutii"), solution.id);
        try {
            await setDoc(docRef, solution);
            console.log(`✅ Soluția "${solution.nume}" a fost adăugată cu ID-ul: ${solution.id}`);
        } catch (e) {
            console.error(`❌ Eroare la adăugarea soluției ${solution.nume}:`, e);
        }
    }
};

addSolutions();
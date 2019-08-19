var numPlans=0;
var occupationsList='10173=AA Patrolman;10174=Abattoir Inspector;10175=Accountant;11408=Accounts assistant;10176=Accounts Clerk;10177=Actor;10178=Actress;10179=Actuary;10180=Acupuncturist;10181=Administration Manager;10182=Administration Worker;10183=Adult Education Teacher;10184=Advertising Consultant;10185=Advertising Designer;10186=Advertising Salesperson;10187=Aerial Erector;10188=Aerial Photographer;10189=Aerial Rigger;10190=Aerobics Instructor;10191=Aeroplane Maintenance Technician;10192=Agricultural Advisor;10193=Agricultural Contractor;10194=Agricultural Worker;10195=Agriculturist;10196=AI Man;10197=Air Conditioning Engineer;10198=Air Hostess;10199=Air Steward;10200=Air Traffic Controller;10201=Aircraft Engineer;10202=Aircraft Mechanic/Fitter;10203=Aircraft Pilot (Commercial);10204=Airline baggage handler;10205=Airline Executive;10206=Airline Ground Staff;10207=Airline Pilot;10208=Airlines - Cabin Crew;10209=Airlines - Flying Crew;10210=Airport Police;10211=Ambulance Driver;10212=Ambulance Paramedic;10213=Anaesthetist;10214=Analyst Programmer;10215=Animator;10216=Antique Dealer;10217=Archaeologist;10218=Architect;10219=Architectural Engineer;10220=Architectural Technician;11301=Architectural Technologist;10221=Area Sales Manager;10222=Army (Irish);11481=Army Ranger;10223=Aromatherapist;10224=Art Dealer;10225=Art Director;10226=Art Gallery Attendant;10227=Artificial Inseminator;10228=Artist;11305=Arts Officer;10229=Asbestos Worker;10230=Assembly Line Worker - Heavy Manual;10231=Assembly Line Worker - Light Manual;10232=Assessor;11401=Assistant bank manager;10233=Assistant Hotel Manager;10234=Assistant Manager (Retail);10235=Astrologer;10236=Astronomer;10237=Attorney;10238=Au Pair;10239=Auctioneer;10240=Audio Engineer;10241=Audio Typist;10242=Auditor;10243=Author;10245=Aviation Engineer (Commercial);10244=Aviation Engineer (Irish Army);10246=B&B Proprietor;10247=Baggage Handler;10248=Bailiff;10249=Baker;10250=Bakery Worker;10251=Bank Manager;10252=Bank Official;10253=Bank Secretary;10254=Banker;10255=Bar Manager;10256=Barber;10257=Barman/Barmaid;10258=Barrelman;10259=Barrister;10260=Beautician;10261=Beauty Consultant;10262=Beekeeper;10263=Benefit Assessor;10264=Betting Office Clerk;10265=Betting Office Manager;10266=Binman;10267=Biochemist;10268=Biological Researcher;10269=Biologist;10270=Blacksmith;10271=Blind Maker;11441=Blocklayer;10272=Boatbuilder;10273=Bodyguard;10274=Boiler;10275=Boiler Worker;10276=Bomb Disposal Worker;10277=Boner;10278=Book Binder;10279=Book Shop Manager;10280=Book Shop Owner;10281=Book-Keeper;10282=Bookmaker (On Course);10283=Bookmaker (Shop);10284=Bouncer;10285=Boutique Manager;10286=Boutique Owner;10287=Box Office Clerk;10288=Box Office Manager;10289=Branch Manager;10290=Bread Baker;10291=Bread Roundsman;10292=Brewery Manager;10293=Brewery Worker;10294=BrickLayer;10295=Bridge Builder;10296=Bridge Worker;10297=Broadcaster;10298=Broker (Insurance);10299=Broker Consultant;10300=Brokerage Manager;10301=Builder;10302=Builder Labourer;10303=Building Contractor - Manual Work;10304=Building Contractor - No Manual Work;10305=Building Foreman;10306=Building Inspector;10307=Building Site Foreman;10308=Building Society Clerk;10309=Building Society Executive;10310=Building Society Manager;10311=Building Surveyor;10312=Bulldozer Driver;10313=Bus Conductor;10314=Bus Driver;10315=Bus Inspector;10316=Business Administrator;10317=Business Analyst;10318=Business Consultant;10319=Business Manager;10320=Business Research Analyst;10321=Butcher - No Slaughtering;10322=Butcher - Slaughtering;10323=Butler;11181=Buyer;10325=Cab Driver;10326=Cabin Crew (Commercial);10327=Cabinet Maker;10328=Cable Hand;10329=Cable Layer;10330=Cable TV Engineer;10331=Cafe Proprietor;10332=Cafe Worker;11469=Call centre worker;10333=Calligrapher;10334=Cameraman (Films Television);10335=Cameraman (Journalism);10336=Canal Inspector;10337=Candle Maker;10338=Canteen Cashier;10339=Canteen Manager;10340=Canteen Worker;10341=Captain (Merchant Marine);10342=Captain Aviation (Commercial);10343=Car Assembly Line Worker;10344=Car Body Repairer;10345=Car Dealer;10346=Car Mechanic;10347=Car Paint Sprayer;10348=Car Park Attendant;10349=Car Salesperson;10350=Car Valeter;10351=Cardiologist;10352=Cardiovascular Surgeon;11444=Care assistant;10353=Care Worker;10354=Careers Advisor;10355=Careers Consultant;10356=Caretaker;10357=Cargo Checker;10358=Cargo Reservation Clerk;10359=Cargo Superintendent;10360=Carpenter;10361=Carpet Layer/Fitter;10362=Carpet Retailer;10363=Cartographer;10364=Carton Machine Minder;10365=Cartoonist;10366=Cash Room Assistant;10367=Cash Room Manager;10368=Cash Room Supervisor;10369=Cashier;11470=Cashier (office/bank/building society);10370=Catalogue Compiler;10371=Caterer;10372=Catering Consultant;10373=Catering Officer (Other);10374=Catering Staff (Oil/Gas Rigs);10375=Catering Worker;10376=Ceiling Fitter;10377=Cellar Worker;10378=Cemetery Worker;10379=Central Heating Engineer;10380=Central Heating Installer;10381=Certified Accountant;10382=Chartered Accountant;10383=Chartered Architect;10384=Chartered Engineer;10385=Chartered Surveyor;10386=Chauffeur;10387=Check Out Assistant;10388=Check Out Supervisor;10389=Checker Packer;10390=Cheesemonger;10391=Chef;11471=Chemical analyst;10392=Chemical Engineer (Oil/Gas Rigs);10393=Chemical Engineering Consultant;10394=Chemical Researcher;10395=Chemist;10396=Chemist (Oil/Gas Rigs);10397=Chief Executive Officer;10398=Child Care Worker;10399=Child Minder;10400=Childrens Nurse;10401=Chimney Sweep;10402=Chip Shop Assistant;10403=Chiropodist;10404=Chiropractor;10405=Choreographer;10406=CIE Conductor;10407=CIE Guard;10408=CIE Rail Trackman;10409=CIE Train Driver;10410=Cinema Staff;10411=Civil Defence Officer;10412=Civil Engineer;10413=Civil Servant;10414=Claims Assessor;10415=Class Room Assistant;10416=Cleaner (Windows) < 30 ft;10417=Cleaner (Windows) > 30 ft;10418=Cleaning Lady;11296=Cleaning Person;10419=Clergyman;10420=Clerical Assistant - Civil Service;10421=Clerical Officer - Civil Service;10422=Clerk/Clerical Worker;10423=Clinic Nurse;10424=Clock Maker/Repairer;11472=Clothes designer;10425=Club Owner;10426=Club Secretary;11344=Co-director - manual;11347=Co-director - non-manual;10427=Coach Builder;10428=Coach Driver;10429=Coal Deliveryperson;10430=Coal Merchant;10431=Coal Miner;10432=Coal Yard Worker;10433=Coastguard;10434=Cobbler;10435=Coffin Maker;10436=College Administrator;10437=College Lecturer;10438=College Student;10439=Columnist;10440=Comedian;10441=Commercial Artist;11405=Commercial director;10442=Commercial Pilot;10443=Commercial Traveller;10444=Commis Chef;10445=Commissioner Of Oaths;10446=Commodity Broker;10447=Community Nurse;11448=Community Welfare Officer;10448=Community Worker;10449=Company Accountant;11343=Company director - manual;10450=Company Director - non-manual;10451=Company Executive;11295=Company Representative;10452=Company Secretary;10453=Compliance Officer;10454=Compliant Officer;10455=Comprehensive School Teacher;10456=Computer Aided Designer;10457=Computer Assembler;10458=Computer Manager;10459=Computer Operations Manager;10460=Computer Operator/Engineer;10461=Computer Programmer;10462=Computer Project Manager;10463=Computer Salesman;10464=Computer Software Consultant;10465=Computer Systems Analyst;10466=Concrete Worker;10467=Conductor (Bus);10468=Conductor (Music);10469=Confectioner;10470=Construction Engineer;10471=Construction Site Foreman;10472=Construction Worker < 30 feet;10473=Construction Worker > 30 feet;10474=Consultant Anaesthetist;10475=Consultant Cardiologist;10476=Consultant Gynaecologist;10477=Consultant Physician;10478=Consultant Surgeon;10479=Contract Cleaner;10480=Conveyor Belt Worker;10481=Cook;10482=Cook (Merchant Marine);10483=Coppersmith;10484=Copywriter;10485=Coroner;10486=Costume Designer;10487=Council Clerk;10488=Council Officer;10489=Counsellor;10491=County Council Worker - Manual;10490=County Council Worker - Non Manual;10492=Courier Motor Bike;10493=Courier Van Driver;10494=Court Bailiff;10495=Court Clerk;10496=Court Usher;10497=Crane Driver - > 15 feet;10498=Crane Driver - Ground Level;10499=Creche Owner;10500=Credit Controller;10501=Credit Union Cashier;10502=Curtain Fitter/Maker;10503=Customer Service Worker;10504=Customs & Excise Officer;10505=Customs And Excise Inspector;10506=Dairy Worker;10507=Dance Teacher;10508=Data Processing Clerk;10509=Debt Collector;10510=Deck Officer (Irish Army);10511=Deckhand (Fishing);10512=Deep Sea Diver (Commercial);10513=Defence Forces Member;10514=Delivery Driver;10515=Demolition Worker;10516=Demonstrator (Sales);11222=Dental Hygienist;10517=Dental Nurse;10518=Dental Receptionist;10519=Dental Surgeon;10520=Dental Technician;10521=Dermatologist;10522=Design Engineer;10523=Designer;10524=Desk Top Publisher;10525=Detective (Police);10526=Detective (Private);10527=Detective (Store);10528=Dietician;10529=Digger Driver;10530=Dinner Lady;10531=Diplomat;10532=Directory Enquiries Operator;10533=Disc Jockey;10534=Dispatch Controller;10535=Dispensing Chemist;10536=Dispensing Optician;10537=District Midwife;10538=District Nurse;10539=District Planner;10540=Diver;10541=Docker;10542=Doctor;10543=Doctors Receptionist;10544=Domestic Cleaner;10545=Domestic Electrician;10546=Doorman (Club);10547=Double Glazing Installer;10548=Double Glazing Salesperson;10549=Drama Teacher;10550=Draper;10551=Draughtsman;10552=Dress Maker;10553=Driver (Bus);10554=Driver (HGV);10555=Driver (Taxi);10556=Driver (Van);10557=Driving Instructor;10558=Driving Test Examiner;10559=Dry Cleaner;10560=Dumper Driver;10561=Dustman;10562=Economist;11182=Editor;10563=Eircom Engineer;10564=Eircom Operator;10565=Elderly Care Assistant;10566=Electrical Contractor;10567=Electrical Draughtsman;10568=Electrical Engineer;10569=Electrical Fitter;10570=Electrical Retailer;10571=Electrician - Domestic;10572=Electrician - Industrial;10573=Electronic Goods Assembler;10574=Electronics Designer;10575=Employment Officer;10576=Endocrinologist;10577=Engineer Civil;10578=Engineer Electrical;10579=Engineer Mechanical;10580=Engineer Structural;10581=Engraver;10582=Environmental Health Officer;10583=Estate Agent;11297=Event Manager;11302=Event Organiser;10584=Excavator Worker;10585=Executive Officer;10586=Exhaust Fitter;10587=Exhibition Co-ordinator;10588=Export Manager;10589=Factory Manager;10590=Factory Worker - Heavy Manual;10591=Factory Worker - Light Manual;10592=Farm Labourer/Worker;10593=Farm Manager;10594=Farmer;10595=Farrier;10596=Fas Student;10597=Fashion Buyer;10598=Fashion Designer;10599=Felt Roofer;10600=Fence Erector;10601=Filing Clerk;10602=Film Processor;10603=Finance Broker;10604=Finance Director;11410=Finance manager;10605=Financial Advisor;10606=Financial Controller;11473=Financial services (includes insurance brokers agents);10607=Fireperson;10608=First Officer;10609=Fish And Chip Shop Owner;10610=Fish Factory Worker;10611=Fish Farmer;10612=Fisherman;10613=Fishmonger;10614=Fitness Instructor;10615=Fitted Kitchen Salesman;10616=Fitter;10617=Flat Racing Jockey;10618=Floor Layer;10619=Floor Tiler;11465=Florist;10620=Flour Miller;10621=Foreign Correspondent;10622=Foreman - No Manual Work;10623=Foreman - Some Manual Work;10624=Forestry Worker;10625=Forge Assistant;10626=Fork Lift Driver;10627=Freelance Journalist;10628=Freight Controller;10629=French Polisher;10630=Fruit Grower;10631=Fruit Salesman;10632=Funeral Director;10633=Furnace Worker;10634=Furniture Assembler;10635=Furniture Remover;10636=Furniture Shop Owner;10637=Ganger;10638=Garage Mechanic;10639=Garage Owner/Manager Non-Manual;10640=Garbage Collector;10641=Garda;10642=Garda Sergeant;10643=Garda Superintendent;10644=Gardener;10645=Gas Board Clerk;10646=Gas Fitter;10647=Gas Meter Reader;10648=Gas Meter Tester;10649=Gate Keeper;10650=Genealogist;10651=General Foreman;10652=General Labourer;10654=General Operative - Heavy Manual;10653=General Operative - Light Manual;10655=General Practitioner;10656=Geneticist;10657=Geologist (Oil/Gas Rigs);10658=Geologist (Other);10659=Glass Worker;10660=Glazier;11406=Goldsmith;10661=Government Official;10662=Graphic Designer;10663=Grave Digger;10664=Green Keeper;10665=GreenGrocer;10666=Groom;10667=Ground Steward;10668=Guest House Proprietor;10669=Gym Instructor;10670=Gynaecologist;10671=Hackney Driver;10672=Hairdresser;10673=Harbour Pilot;10674=Haulage Contractor;10675=Head Chef;10676=Head Teacher;10677=Health And Safety Consultant;10678=Health Inspector;10679=Healthcare Worker;10680=Heating Engineer;10681=Heavy Goods Driver;10682=Herbalist;10683=Hgv Driver;10684=Higher Executive Officer;10685=Historian;10686=Home Care Assistant;10687=Home Maker;10688=Homeopath;10689=Horse Breeder;10690=Horse Riding Instructor;10691=Horticulturist;10692=Hospital Attendant;10693=Hospital Porter;10694=Hospital Secretary;10695=Hotel Chef;10696=Hotel Manager;10697=Hotel Porter;10698=Hotel Proprietor;10699=House Decorator;10700=Househusband;10701=Housekeeper;10702=Housewife;10703=Housing Inspector;10704=Human Resources Administrator;11467=Human resources consultant;10705=Hypnotherapist;10706=Ice Cream Vendor;10707=Immigration Officer;10708=Import Administrator;10709=Independent Financial Advisor;10710=Industrial Cleaner;10711=Industrial Relations Advisor;11407=Information officer;10712=Inseminator;10713=Inspector Of Taxes;10714=Instore Demonstrator;10715=Insurance Agent;10716=Insurance Assessor;10717=Insurance Associate;10718=Insurance Broker/Agent;10719=Insurance Consultant;10720=Insurance Salesperson;10721=Insurance Staff;10722=Insurance Underwriter;10723=Interior Designer;10724=Internal Auditor;11285=Internet Designer;11286=Internet Specialist;10725=Interpreter;10726=Investment Analyst;10727=Investment Banker;10728=Investment Broker;10729=Investment Consultant;10730=Ironmonger;11403=IT administrator;10731=IT Consultant;11442=IT manager;10732=IT Programmer;11402=IT technician;10733=Janitor;10734=JCB Digger Driver;10735=Jeweller - Repairs/Making;10736=Jewellery Designer;10737=Jewelry Retailer;10738=Jiggerman;10739=Jockey;10740=Joiner;10741=Journalist;10742=Judge;10743=Keep Fit Instructor;10744=Kitchen Assistant;10745=Kitchen Porter;10746=Kitchen Supplier Fitter;10747=Lab. Technician;10748=Labourer;10749=Land Surveyor;10750=Landlord;10751=Landscape Gardener;10752=Laundry Worker;10753=Lawyer;10754=Lecturer;10755=Legal Advisor;10756=Legal Secretary;10757=Leisure Centre Attendant;10758=Letting Agent;10759=Librarian;10760=Licensed Victualler;10761=Life Assurance Broker;10762=Life Assurance Consultant;10763=Life Assurance Salesperson;10764=Life Guard;10765=Lifeboat Man;10766=Lift Repair person;10767=Lighting Technician;10768=Linesman;10769=Lithographer;10770=Litigation Manager;10771=Lobster Fisherman;10772=Local Council Officer;10773=Locksmith;10774=Locomotive Driver;10775=Lollipop Lady;10776=Lorry Driver;10777=Loss Adjuster;10778=Loss Assessor;10779=Lumberjack;10780=Machine Worker;10781=Machinist;10782=Magazine Editor;10783=Magistrate;10784=Maintenance Engineer;10785=Maintenance Fitter;10786=Maintenance Technician (Oil/Gas Rigs);10787=Make Up Artist;10788=Management Consultant;11418=Manager;10789=Manager - clerical;11342=Manager - non-clerical;11474=Managing director (no manual work);11290=Manual Worker;10790=Map Maker;10791=Marine Engineer;10792=Marine Maintenance Fitter;10793=Market Gardener;10794=Market Researcher;10795=Market Trader;10796=Marketing Analyst;10797=Marketing Assistant;10798=Marketing Executive;10799=Mason;10800=Masonry Restorer;10801=Master Butcher;10802=Mathematician;10803=Matron (Nursing);10804=Mature Student;10805=Meat Supplier;10806=Mechanic;10807=Mechanical Engineer;10808=Mechanics Assistant;10809=Medical Practitioner;10810=Medical Representative;10811=Medical Researcher;10812=Medical Secretary;10813=Member Of European Parliament;10814=Member Of The Stock Exchange;10815=Merchandiser;10816=Merchant Banker;10817=Merchant Seaman;10818=Metal Worker;10819=Meter Collector;10820=Meter Fitter;10821=Meter Reader;10822=Meter Tester;10823=Microbiologist;10824=Midwife;10825=Milk Roundsperson;10826=Milliner;10827=Milling Worker;10828=Miner;10829=Minicab Driver;10830=Minister (Religious);10831=Mobile Crane Driver (Ground Level);10832=Model;10833=Money Broker;10834=Montessori Teacher;10835=Mortgage Advisor;10836=Mortician;10837=Mother And Housewife;10838=Motor Car Dealer;10839=Motor Cycle Courier;10840=Motor Mechanic;10841=Motorbike Mechanic;10842=Motorway Maintenance;10843=Museum Worker;10844=Musician;10845=Nanny;10846=National Hunt Jockey;11468=Navy officer;10847=Neurologist;10848=News Correspondent;10849=News Editor;10850=Newsagent;10851=Newspaper Reporter;10852=Newsreader;10853=Night Club Owner;10854=Night Porter;10855=Not Currently Employed;10856=Nurse - GP Practise;11482=Nurse - Hospital;11522=Nurse - primary care;10857=Nurse - Psychiatric;10858=Nursery Worker (Agriculture);10859=Nursery Worker (Education);10860=Nursing Home Owner;10861=Nutritionist;10862=Obstetrician;10863=Occupational Therapist;10864=Off License Manager;10865=Office Cleaner;10866=Office Messenger;10867=Office Worker;10868=Oil Rigs - Manual;10869=Oil Rigs - Non-Manual;10870=Oncologist;11413=Operations manager;10871=Opthalmic Surgeon;10872=Optician;10873=Optometrist;10874=Organist;10875=Orthodontist;10876=Orthopaedic Surgeon;10877=Orthoptist;10878=Osteopath;10879=Overhead Linesman;10880=Overseas Voluntary Worker;10881=P.R. Consultant;10882=Paediatric Surgeon;10883=Paediatrician;10884=Paint Sprayer;10885=Painter & Decorator - avg < 30 feet;10886=Painter & Decorator - avg > 30 feet;10887=Pallet Maker;10888=Panel Beater;10889=Paramedic;10890=Park Keeper;10891=Park Ranger;10892=Parking Attendant;10893=Pastry Chef;10894=Pathologist;10895=Pawnbroker;10896=Payroll Clerk;10897=PC Support Engineer;10898=Pension Administrator;10899=Pension Consultant;10900=Pension Manager;10901=Pensioner;10902=Permanent Way Inspector;10903=Personal Assistant;10904=Personal Financial Advisor;10905=Personal Secretary;10906=Personnel Assistant;10907=Personnel Manager;10908=Pet Shop Owner;10909=Petrol Pump Attendant;10910=Pharmaceutical Worker;10911=Pharmacist;10912=Pharmacy Assistant;10913=Philatelist;10914=Phlebotomist;10915=Phone Engineer;10916=Photocopy Engineer;10917=Photographer;10918=Photographer (Aerial);10919=Physical Education Teacher;10920=Physicist;10921=Physiotherapist;10922=Picture Framer;10923=Picture Restorer;10924=Pilot Airline;10925=Pilot Helicopter (Commercial);10926=Pipe Layer;10927=Planning Advisor;10928=Plant Hire Worker;10929=Plasterer;10930=Plastic Surgeon;10931=Plate Layer;10932=Playgroup Leader;10933=Playschool Assistant;10934=Plumber;10935=Plumbing And Heating Engineer;10936=Pneumatic Drill Worker;10937=Podiatrist;10938=Police;10939=Political Correspondent;10940=Politician;10941=Port Worker;10942=Porter Hotel/Hospital;10946=Post Primary Teacher;10943=Postal Worker;11417=Postman;10944=Postperson - Driving;10945=Postperson - No Driving;10947=Pottery Worker;10948=Poultry Worker;10949=Power Station Worker;11475=Practice manager (gp surgery);10950=Precision Engineer;10951=Press Officer;10952=Priest;10953=Primary School Teacher;10954=Principal;10955=Printer;10956=Prison Officer;10957=Private Detective;10958=Private Pilot;10959=Probation Officer;11523=Process operator;11411=Process technician;11404=Production control manager;10960=Production Operator;11244=Professional footballer;11242=Professional Golfer ;11243=Professional rugby player;11294=Professional Sports Person;10961=Professor;10962=Programmer;11461=Project director;11462=Project manager;11262=Projectionist;11304=Promotions Assistant;11303=Promotions Manager;10963=Property Developer;11443=Property supervisor;10964=Psychiatrist;10965=Psychologist;10966=Psychotherapist;10967=Public Health Inspector;10968=Public Relations Officer;10969=Publican;10970=Publisher;11464=Quality analyst;10971=Quality Controller;10972=Quantity Surveyor;10973=Quarry Worker;10974=Racehorse Jockey;10975=Racehorse Trainer;10976=Radio Presenter;10977=Radiographer;10978=Radiologist;10979=Radiotherapist;10981=Railway - Guard;10982=Railway - Maintenance;10980=Railway - Signaler;10983=Railway - Ticket Collector / Inspector;10984=Railway Crossing Keeper;10985=Receptionist;10986=Recruitment Consultant;10987=Redundant;10988=Reflexology Consultant;10989=Refuse Collector;10990=Regional Sales Manager;10991=Registered Child Minder;10992=Remedial Teacher;10993=Removal Worker;10994=Reporter;10995=Researcher;10996=Restaurant Worker;10997=Restauranteur;10998=Restorer (Furniture);11445=Retail assistant;11409=Retail manager;10999=Retailer;11000=Retired;11463=Revenue manager;11001=Revenue Officer;11002=Rheumatologist;11003=Rigger (Oil/Gas Rigs);11004=Rigger (Onshore);11005=Road Maintenance Worker;11006=Road Safety Officer;11007=Roofer;11008=Sacristan;11009=Safety Analyst;11010=Safety Training Consultant;11011=Sailor (Merchant Marine);11012=Sales Assistant - Light Goods;11013=Sales Assistant - Shop;11014=Sales Executive;11414=Sales manager;11416=Sales rep;11015=Salesperson/Commercial Traveller;11016=Salmon Farmer;11017=Sander;11018=Satellite Dish Installer;11019=Saw Doctor;11020=Sawmill Worker;11021=Scaffolder;11022=School Caretaker;11023=School Teacher;11024=Schools Inspector;11025=Scientific Researcher;11026=Scrapman;11027=Seaman (Merchant Marine);11028=Seamstress;11029=Search Rescue Worker;11031=Secondary School Teacher;11032=Secretary;11033=Security Guard;11034=Security Van Driver;11035=Senior Executive Officer;11030=Service Co-ordinator/Supervisor;11036=Service Engineer;11037=Sewage Worker;11038=Sewing Machinist;11039=Share Dealer;11040=Sheet Metal Worker;11041=Shipbuilder;11042=Shipping Clerk;11043=Ships Captain;11044=Ships Steward;11045=Shoe Maker;11046=Shoe Repairer;11047=Shop Assistant;11048=Shop Detective;11049=Shop Steward;11050=Shopfitter;11051=Shopkeeper - Light Goods;11052=Shunter;11053=Sign Erector - Greater than 30ft;11054=Sign Erector - Less than 30ft;11055=Signalman;11056=Silversmith;11057=Singing Teacher;11058=Site Foreman;11059=Sky Dish Installer;11060=Slater;11061=Social Worker;11062=Software Engineer;11063=Soldier;11064=Solicitor;11065=Sorting Office Worker;11066=Sound Engineer;11067=Sound Technician;11447=Special Needs Assistant (school);11068=Speech Therapist;11323=Sports coach;11322=Sports Development Officer;11291=Sports Player;11069=Sports Reporter;11292=Sportsman;11293=Sportswoman;11070=Spray Painter;11071=Stable Hand;11072=Staff Nurse;11073=Station Master;11074=Statistician;11075=Steel Erector;11076=Steelworker;11077=Steeplejack;11078=Stevedore;11079=Stock Broker;11080=Stockroom Controller;11081=Stone Mason;11082=Store Detective;11083=Store Manager;11084=Street Cleaner;11085=Street Market Trader;11086=Structural Engineer;11087=Student;11088=Supermarket Worker;11415=Supervisor;11089=Surgeon;11090=Surveyor;11091=Swimming Pool Attendant;11092=Switchboard Operator;11093=Systems Analyst;11094=Systems Programmer;11095=Tailor;11096=Takeaway Owner;11097=Tanner;11098=Tarmac Layer;11099=Tax Advisor;11100=Tax Inspector;11101=Taxi Driver;11102=Taxidermist;11103=Teacher - School;11104=Tealady;11105=Team Manager;11412=Technical assistant;11449=Technician;11106=Telecom Installer/Engineer;11107=Telephonist;11108=Telesales;11109=Television Engineer;11110=Television Producer;11111=Theatre Sister;11446=Theatre worker (surgical);11112=Theatrical Worker;11113=Therapist;11114=Ticket Clerk;11115=Ticket Inspector;11116=Tiler - Floor/Wall;11117=Tiler - Roof;11118=Timber Worker;11119=Toolmaker;11466=Tour guide;11476=Town planner;11120=Trade Union Official;11121=Traffic Warden;11122=Train Driver;11123=Trainee Accountant;11124=Trainee Doctor;11125=Training Consultant;11126=Travel Consultant;11127=Treasurer;11128=Tree Surgeon;11129=Truck Driver;11130=Tunneller;11131=Turf Accountant;11132=Turner Fitter;11133=TV Cameraman;11134=TV Presenter;11135=TV Repairer;11136=Typesetter;11137=Typist;11138=Tyre and Exhaust Fitter;11139=Undertaker;11140=Underwriter;11141=Unemployed;11142=University Lecturer;11143=University Student;11144=Upholsterer;11145=Valet;11146=Valuer;11147=Van Driver/Delivery Person;11148=Vat Inspector;11149=Vegetable Supplier;11150=Vehicle Inspector;11152=Vet surgeon small animals;11502=Veterinary Nurse;11151=Veterinary Surgeon - Large Animal;11153=Vice Principal;11154=Victualler;11155=Vintner;11156=Vocational Training Instructor;11157=Voluntary Work;11158=Wages Clerk;11159=Waiter/Waitress;11160=Wall Tiler;11161=Warden (Prison Service);11162=WareHouse Person;11163=Waste Disposal Collector;11183=Watch Maker/Repairer;11284=Website Creator;11282=Website Designer;11283=Website Specialist;11164=Welder;11165=Wholesaler;11166=Wife and Mother;11167=Window Cleaner - Less than 30ft;11168=Window Cleaner - Other;11169=Window Dresser;11170=Window Installer < 30 ft;11171=Window Installer > 30 ft;11172=Windscreen Fitter;11173=Wine Bar Owner;11174=Wood Worker;11175=Works Foreman;11176=Writer;11177=X-Ray Technician;11178=Youth Worker;11179=Zoo Keeper;11180=Zoologist;'

var occupationsArray = occupationsList.split(';');

function writePlansOnScreen()
{
	var plansHtml = '';

for (var i = 0; i < localStorage.length; i++){
	if (localStorage.key(i) != 'currentSeller' &&
		localStorage.key(i) != 'numPlans')
    plansHtml+=(
	localStorage.key(i) + ' - ' + localStorage.getItem(localStorage.key(i)) + ' <span style="cursor:pointer;text-decoration:underline" onclick="getPlanFromStorage(\''+localStorage.key(i) + '\');">Open</span>&nbsp;&nbsp;<span style="cursor:pointer;text-decoration:underline" onclick="clearPlanFromStorage(\''+localStorage.key(i) + '\');">Delete</span><br><br>');
}
 document.getElementById('tooltip').innerHTML=plansHtml;
 document.getElementById('tooltip').style.display='block';
}

function copyAddressToLife2()
{
		if (document.getElementById('secondParentY').checked)
		{
			document.getElementById('life2AddressLine1Txt').value = document.getElementById('life1AddressLine1Txt').value;
			document.getElementById('life2AddressLine2Txt').value = document.getElementById('life1AddressLine2Txt').value;
			document.getElementById('life2AddressLine3Txt').value = document.getElementById('life1AddressLine3Txt').value;
			document.getElementById('life2CountyCd').value = document.getElementById('life1CountyCd').value;
		}
		else
		{
			document.getElementById('life2AddressLine1Txt').value = '';
			document.getElementById('life2AddressLine2Txt').value = '';
			document.getElementById('life2AddressLine3Txt').value = '';
			document.getElementById('life2CountyCd').selectedIndex=0;
		
		}
			
}


function storeItem()
{	
	sellerCode = localStorage.currentSeller;
	if (!isNaN(localStorage.numPlans))
	{
		numPlans=localStorage.numPlans;
	}
		numPlans++;
		var planString='';	
		
		planString = document.getElementById('life1TitleCd').value +//0
		';'+document.getElementById('life1ForeName').value + //1
		';'+document.getElementById('life1SurName').value; //2
		
		if (document.getElementById('life1SexCdM').checked)
		{
			planString+=';M';
		}
		else
		{
			planString+=';F'; //3
		}
		
		planString+=';'+document.getElementById('life1RelationshipWithChild').value + //4
		';'+document.getElementById('dependentChildrenNo').value;  //5
		
		//';'+document.getElementById('life1Occupation1Cd').value + //6
		//';'+document.getElementById('life1Occupation1Cd')[document.getElementById('life1Occupation1Cd').selectedIndex].innerHTML + //7

		//get the occupation from the screen and lookup the code
		var occupation = document.getElementById('life1Occupation1Cd_ExtInput').value;
		planString+=';'+getOccupationId(occupation) +
		';'+occupation +
		
		';'+document.getElementById('life1BirthDt_Day').value + //8
		';'+document.getElementById('life1BirthDt_Month').value + //9
		';'+document.getElementById('life1BirthDt_Year').value + //10
		
		';'+document.getElementById('life1EmailAddressTxt').value + //11
		';'+document.getElementById('life1ConfirmEmailAddress').value + //12
		';'+document.getElementById('life1MobilePhoneNo').value +  //13
		';'+document.getElementById('life1AddressLine1Txt').value + //14
		';'+document.getElementById('life1AddressLine2Txt').value + //15
		';'+document.getElementById('life1AddressLine3Txt').value + //16
		';'+document.getElementById('life1CountyCd').value + //17
		
		';'+document.getElementById('secondParentY').checked + //18
		
		';'+document.getElementById('life2TitleCd').value + //19
		';'+document.getElementById('life2ForeName').value + //20
		';'+document.getElementById('life2SurName').value; //21
		
		if (document.getElementById('life2SexCdM').checked) //22
		{
			planString+=';M';
		}
		else
		{
			planString+=';F';
		}
		planString+=';'+document.getElementById('life2RelationshipWithChild').value + //23
		';'+document.getElementById('life2RelationshipWithOtherParent').value;  //24
		
		//';'+document.getElementById('life2Occupation1Cd').value + //25
		//';'+document.getElementById('life2Occupation1Cd')[document.getElementById('life2Occupation1Cd').selectedIndex].innerHTML + //26

		//get the occupation from the screen and lookup the code
		var occupation = document.getElementById('life2Occupation1Cd_ExtInput').value;
		planString+=';'+getOccupationId(occupation) +
		';'+occupation +
		
		';'+document.getElementById('life2BirthDt_Day').value + //27
		';'+document.getElementById('life2BirthDt_Month').value + //28
		';'+document.getElementById('life2BirthDt_Year').value + //29
				
		';'+document.getElementById('life2EmailAddressTxt').value + //30
		';'+document.getElementById('life2ConfirmEmailAddress').value + //31
		';'+document.getElementById('life2MobilePhoneNo').value + //32
		';'+document.getElementById('life2AddressLine1Txt').value + //33
		';'+document.getElementById('life2AddressLine2Txt').value + //34
		';'+document.getElementById('life2AddressLine3Txt').value + //35
		';'+document.getElementById('life2CountyCd').value; //36

	try
	{		
		localStorage[sellerCode+'-'+numPlans]=planString;			
		localStorage["numPlans"]=numPlans;
	
		alert("item " + localStorage["numPlans"] + " stored");			
	}
	catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			alert('Quota exceeded!');
		}
	}
	
	clearTheForm();

}

function clearTheForm()
{
		document.getElementById('life1TitleCd').value ='';
		document.getElementById('life1ForeName').value ='';
		document.getElementById('life1SurName').value='';
		
		document.getElementById('life1SexCdM').checked = false;
		document.getElementById('life1SexCdF').checked = false;
		document.getElementById('dependentChildrenNo').value ='';
		
		document.getElementById('life1Occupation1Cd').value ='';

		document.getElementById('life1BirthDt_Day').value ='';
		document.getElementById('life1BirthDt_Month').value ='';
		document.getElementById('life1BirthDt_Year').value ='';
		
		document.getElementById('life1EmailAddressTxt').value ='';
		document.getElementById('life1ConfirmEmailAddress').value ='';
		document.getElementById('life1MobilePhoneNo').value ='';
		document.getElementById('life1AddressLine1Txt').value ='';
		document.getElementById('life1AddressLine2Txt').value ='';
		document.getElementById('life1AddressLine3Txt').value ='';
		document.getElementById('life1CountyCd').value ='';
		
		document.getElementById('secondParentY').checked = false;
		document.getElementById('life2TitleCd').value ='';
		document.getElementById('life2ForeName').value ='';
		document.getElementById('life2SurName').value ='';
		
		document.getElementById('life2SexCdM').checked = false;
		document.getElementById('life2SexCdF').checked = false;
		
		document.getElementById('life2RelationshipWithChild').selectedIndex = 0;
		document.getElementById('life2RelationshipWithOtherParent').selectedIndex=0;
		
		document.getElementById('life2Occupation1Cd').value ='';
				
		document.getElementById('life2BirthDt_Day').value ='';
		document.getElementById('life2BirthDt_Month').value ='';
		document.getElementById('life2BirthDt_Year').value ='';
				
		document.getElementById('life2EmailAddressTxt').value ='';
		document.getElementById('life2ConfirmEmailAddress').value ='';
		document.getElementById('life2MobilePhoneNo').value ='';
		document.getElementById('life2AddressLine1Txt').value ='';
		document.getElementById('life2AddressLine2Txt').value ='';
		document.getElementById('life2AddressLine3Txt').value ='';
		document.getElementById('life2CountyCd').value ='';
		
		document.getElementById('life1GoodHealthCdY').checked = false;
		document.getElementById('life2GoodHealthCdY').checked = false;
		document.getElementById('life1MarketingConsentCdY').checked = false;
		document.getElementById('life2MarketingConsentCdY').checked = false;
		document.getElementById('life1IrishLifeDataConsentCdY').checked = false;
		document.getElementById('life2IrishLifeDataConsentCdY').checked = false;
		document.getElementById('life1EdocsIndicatorCdY').checked = false;
		document.getElementById('life2EdocsIndicatorCdY').checked = false;
		
}


function clearPlanFromStorage(keyIn)
{	
		localStorage.removeItem(keyIn);
		alert("item " + keyIn + " removed");			
}

function getPlanFromStorage(keyIn)
{

		var storedPlan=localStorage[keyIn];
		var planArray = storedPlan.split(';');
		
		document.getElementById('life1TitleCd').value = planArray[0];
		document.getElementById('life1ForeName').value = planArray[1];
		document.getElementById('life1SurName').value = planArray[2];
		
		var life1Sex=planArray[3];
		if (life1Sex == 'M')
		{
			document.getElementById('life1SexCdM').checked = true;
		}
		else
		{
			document.getElementById('life1SexCdF').checked = true;
		}
		
		document.getElementById('life1RelationshipWithChild').value = planArray[4];
		document.getElementById('dependentChildrenNo').value = planArray[5];
		
		document.getElementById('life1Occupation1Cd').value = planArray[6];
		document.getElementById('life1Occupation1Cd_ExtInput').value = planArray[7];

		document.getElementById('life1GoodHealthCdY').checked=goodHealth1=true;
		
		document.getElementById('life1BirthDt_Day').value = planArray[8];
		document.getElementById('life1BirthDt_Month').value = planArray[9];
		document.getElementById('life1BirthDt_Year').value = planArray[10];
		
		document.getElementById('life1EmailAddressTxt').value = planArray[11];
		document.getElementById('life1ConfirmEmailAddress').value = planArray[12];
		document.getElementById('life1MobilePhoneNo').value = planArray[13];       
		document.getElementById('life1AddressLine1Txt').value = planArray[14];
		document.getElementById('life1AddressLine2Txt').value = planArray[15];
		document.getElementById('life1AddressLine3Txt').value = planArray[16];
		document.getElementById('life1CountyCd').value = planArray[17];

		document.getElementById('life1IrishLifeDataConsentCdY').checked= true;

		document.getElementById('life1MarketingConsentCdY').checked=true;
		
		//document.getElementById('life1PlanDocumentsConsentCdY').checked=true;

		document.getElementById('life1EdocsIndicatorCdY').checked=true;
		
		var secondParent=planArray[18];
		document.getElementById('secondParentY').checked = secondParent == 'true';
		
		document.getElementById('life2TitleCd').value = planArray[19];
		document.getElementById('life2ForeName').value = planArray[20];
		document.getElementById('life2SurName').value = planArray[21];
		
		var life2Sex=planArray[22];
		if (life2Sex == 'M')
		{
			document.getElementById('life2SexCdM').checked = true;
		}
		else
		{
			document.getElementById('life2SexCdF').checked = true;
		}
		document.getElementById('life2RelationshipWithChild').value = planArray[23];
		document.getElementById('life2RelationshipWithOtherParent').value = planArray[24];
		
		document.getElementById('life2Occupation1Cd').value = planArray[25];
		document.getElementById('life2Occupation1Cd_ExtInput').value = planArray[26];
				
		document.getElementById('life2GoodHealthCdY').checked=true;
		
		document.getElementById('life2BirthDt_Day').value = planArray[27];
		document.getElementById('life2BirthDt_Month').value = planArray[28];
		document.getElementById('life2BirthDt_Year').value = planArray[29];
				
		document.getElementById('life2EmailAddressTxt').value = planArray[30];
		document.getElementById('life2ConfirmEmailAddress').value = planArray[31];
		document.getElementById('life2MobilePhoneNo').value = planArray[32];
		document.getElementById('life2AddressLine1Txt').value = planArray[33];
		document.getElementById('life2AddressLine2Txt').value = planArray[34];
		document.getElementById('life2AddressLine3Txt').value = planArray[35];
		document.getElementById('life2CountyCd').value = planArray[36];
		document.getElementById('life2IrishLifeDataConsentCdY').checked=true;

		document.getElementById('life2MarketingConsentCdY').checked=true;
		//document.getElementById('life2PlanDocumentsConsentCdY').checked=true;

		document.getElementById('life2EdocsIndicatorCdY').checked=true;
}

if (window.addEventListener) {
  window.addEventListener("storage", handle_storage, false);
} else {
  window.attachEvent("onstorage", handle_storage);
};

function handle_storage(e) {
  if (!e) { e = window.event; }
}

function getOccupationId(occupationIn)
{
for (i =0;i < occupationsArray.length;i++)
{
	var occupation=occupationsArray[i].split('=')[1];
	if (occupationIn == occupation)
	{
		return occupationsArray[i].split('=')[0];
	}
	
}

}
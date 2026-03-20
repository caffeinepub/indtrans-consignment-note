import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type ConsignmentNote = {
    gcNo : Text;
    date : Text;
    fromCity : Text;
    toCity : Text;
    truckNo : Text;
    consignorName : Text;
    consignorAddress : Text;
    consignorGST : Text;
    consigneeName : Text;
    consigneeAddress : Text;
    consigneeGST : Text;
    description : Text;
    noOfArticles : Text;
    modePacking : Text;
    invoiceNo : Text;
    invoiceDate : Text;
    invoiceValue : Text;
    weightActual : Text;
    weightChanded : Text;
    rate : Text;
    freight : Text;
    advance : Text;
    hamaali : Text;
    stChange : Text;
    duty : Text;
    taxes : Text;
    grandTotal : Text;
    amountToPayRs : Text;
    amountToPayP : Text;
    amountPaidRs : Text;
    amountPaidP : Text;
    remarks : Text;
    billedTo : Text;
  };

  stable var stableNotes : [(Text, ConsignmentNote)] = [];

  var consignmentNotes = Map.empty<Text, ConsignmentNote>();

  system func preupgrade() {
    stableNotes := consignmentNotes.entries().toArray();
  };

  system func postupgrade() {
    for ((k, v) in stableNotes.vals()) {
      consignmentNotes.add(k, v);
    };
    stableNotes := [];
  };

  public shared ({ caller }) func createConsignmentNote(
    gcNo : Text,
    date : Text,
    fromCity : Text,
    toCity : Text,
    truckNo : Text,
    consignorName : Text,
    consignorAddress : Text,
    consignorGST : Text,
    consigneeName : Text,
    consigneeAddress : Text,
    consigneeGST : Text,
    description : Text,
    noOfArticles : Text,
    modePacking : Text,
    invoiceNo : Text,
    invoiceDate : Text,
    invoiceValue : Text,
    weightActual : Text,
    weightChanded : Text,
    rate : Text,
    freight : Text,
    advance : Text,
    hamaali : Text,
    stChange : Text,
    duty : Text,
    taxes : Text,
    grandTotal : Text,
    amountToPayRs : Text,
    amountToPayP : Text,
    amountPaidRs : Text,
    amountPaidP : Text,
    remarks : Text,
    billedTo : Text,
  ) : async () {
    let consignmentNote : ConsignmentNote = {
      gcNo;
      date;
      fromCity;
      toCity;
      truckNo;
      consignorName;
      consignorAddress;
      consignorGST;
      consigneeName;
      consigneeAddress;
      consigneeGST;
      description;
      noOfArticles;
      modePacking;
      invoiceNo;
      invoiceDate;
      invoiceValue;
      weightActual;
      weightChanded;
      rate;
      freight;
      advance;
      hamaali;
      stChange;
      duty;
      taxes;
      grandTotal;
      amountToPayRs;
      amountToPayP;
      amountPaidRs;
      amountPaidP;
      remarks;
      billedTo;
    };

    ignore consignmentNotes.remove(gcNo);
    consignmentNotes.add(gcNo, consignmentNote);
  };

  public query ({ caller }) func getConsignmentNote(gcNo : Text) : async ConsignmentNote {
    switch (consignmentNotes.get(gcNo)) {
      case (null) { Runtime.trap("Consignment note does not exist") };
      case (?consignmentNote) { consignmentNote };
    };
  };

  public query ({ caller }) func getAllConsignmentNotes() : async [ConsignmentNote] {
    consignmentNotes.values().toArray();
  };

  public query ({ caller }) func getConsignmentNotesByCity(city : Text) : async [ConsignmentNote] {
    consignmentNotes.values().toArray().filter(
      func(consignmentNote) {
        consignmentNote.fromCity.contains(#text city) or consignmentNote.toCity.contains(#text city);
      }
    );
  };

  public query ({ caller }) func getConsignmentNotesByConsignor(consignorName : Text) : async [ConsignmentNote] {
    consignmentNotes.values().toArray().filter(
      func(consignmentNote) {
        consignmentNote.consignorName.contains(#text consignorName);
      }
    );
  };
};

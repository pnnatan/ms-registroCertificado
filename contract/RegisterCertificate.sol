pragma solidity ^0.5.6;
pragma experimental ABIEncoderV2;

contract RegisterCertificate{
    address public owner;
    string[] public CertificatesList;
    
    struct Certificate {
        string id;
        string Certificate;
        string date;
    }
    
    mapping (string => Certificate) private Certificates;

    constructor() public {
        owner = msg.sender;
    }
    
    function includeCertificateBlockchain(string memory _id, string memory _Certificate, string memory _date) public returns (string memory){
        if(msg.sender != owner) return "ERRO: Somente o proprietário pode executar essa função!";

        Certificates[_id] = Certificate(_id, _Certificate, _date);
        CertificatesList.push(_id); 

        return "SUCESSO: Certificate successfully registered!";
    }
    
    function getAllCertificateBlockchain() public view returns (string[] memory){
        return CertificatesList;
    }
    
    function getCertificateBlockchain(string memory _id) public view returns (Certificate memory){
        return Certificates[_id];
    }
    
    function changeOwner(address newOwner) public returns (string memory) {
        if (msg.sender != owner) return "ERROR: Only the owner can perform this function!";
        owner = newOwner;
        return "SUCCESS: Owner changed!";
    }
    
    
}
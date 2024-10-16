const CONTACTDATADUMMY = [
  { "id": 1, "name": "John Doe", "contactmailingaddress": "123 Main St, Anytown, USA", "accountName": "ABC Company", "businessphone": "(555) 123-4567", "mobile": "(555) 987-6543", "email": "john.doe@example.com", "status": "Active" },
  { "id": 2, "name": "Jane Smith", "contactmailingaddress": "456 Elm St, Another Town, USA", "accountName": "XYZ Corporation", "businessphone": "(555) 222-3333", "mobile": "(555) 999-8888", "email": "jane.smith@example.com", "status": "Inactive" },
  { "id": 3, "name": "Michael Johnson", "contactmailingaddress": "789 Oak St, Somecity, USA", "accountName": "123 Enterprises", "businessphone": "(555) 444-5555", "mobile": "(555) 111-2222", "email": "michael.johnson@example.com", "status": "Active" },
  { "id": 4, "name": "Emily Brown", "contactmailingaddress": "321 Pine St, Yourtown, USA", "accountName": "Brown & Sons", "businessphone": "(555) 777-8888", "mobile": "(555) 333-4444", "email": "emily.brown@example.com", "status": "Active" },
  { "id": 5, "name": "David Wilson", "contactmailingaddress": "555 Cedar St, Hometown, USA", "accountName": "Wilson Holdings", "businessphone": "(555) 666-7777", "mobile": "(555) 555-1234", "email": "david.wilson@example.com", "status": "Inactive" },
  { "id": 6, "name": "Sarah Davis", "contactmailingaddress": "999 Maple St, Cityville, USA", "accountName": "Davis Consulting", "businessphone": "(555) 888-9999", "mobile": "(555) 222-3333", "email": "sarah.davis@example.com", "status": "Active" },
  { "id": 7, "name": "Robert Martinez", "contactmailingaddress": "777 Birch St, Metropolis, USA", "accountName": "Martinez & Co", "businessphone": "(555) 123-9876", "mobile": "(555) 789-4567", "email": "robert.martinez@example.com", "status": "Inactive" },
  { "id": 8, "name": "Jennifer Taylor", "contactmailingaddress": "888 Walnut St, Suburbia, USA", "accountName": "Taylor Enterprises", "businessphone": "(555) 456-7890", "mobile": "(555) 987-6543", "email": "jennifer.taylor@example.com", "status": "Active" },
  { "id": 9, "name": "Christopher Clark", "contactmailingaddress": "444 Sycamore St, Villagetown, USA", "accountName": "Clark Group", "businessphone": "(555) 987-6543", "mobile": "(555) 234-5678", "email": "christopher.clark@example.com", "status": "Active" },
  { "id": 10, "name": "Amanda Lee", "contactmailingaddress": "222 Pineapple St, Islandcity, USA", "accountName": "Lee Industries", "businessphone": "(555) 654-3210", "mobile": "(555) 876-5432", "email": "amanda.lee@example.com", "status": "Inactive" }

]

const CONTACTCOLUMNDUMMY = [
  { "label": "Name", "accessor": "name" },
  { "label": "Contact Mailing Address", "accessor": "contactmailingaddress" },
  { "label": "Account Name", "accessor": "accountName" },
  { "label": "Bussines Phone", "accessor": "businessphone" },
  { "label": "Mobile", "accessor": "mobile" },
  { "label": "Email", "accessor": "email" },
  { "label": "Status", "accessor": "status" },
]

const ACCOUNTCOLUMNDUMMY = [
  { "label": "Account Name", "accessor": "accountName", "isClickable": true , "url": "details" },
  { "label": "Phone", "accessor": "phone", "isClickable": false },
  { "label": "website", "accessor": "website", "isClickable": false },
  { "label": "Status", "accessor": "status", "isClickable": false },
  { "label": "Billing Post Code", "accessor": "billingPostCode", "isClickable": false },
  { "label": "Billing City", "accessor": "billingCity", "isClickable": false },
  { "label": "Billing Street", "accessor": "billingStreet", "isClickable": false },
  { "label": "Status", "accessor": "status", "isClickable": false },
  { "label": "Inactivation Date", "accessor": "inactivationDate", "isClickable": false },
  { "label": "Created By", "accessor": "createdBy", "isClickable": false },
  { "label": "Source System", "accessor": "sourceSystem", "isClickable": false },
  { "label": "Created Date", "accessor": "createdDate", "isClickable": false },
  { "label": "Modified By", "accessor": "modifiedBy", "isClickable": false },
  { "label": "Modified Date", "accessor": "modifiedDate", "isClickable": false },
  { "label": "Billing Country", "accessor": "billingCountry", "isClickable": false }
]

const ACCOUNTDATADUMMY = [
  { "id": 1, "accountName": "Acme Corp", "accountStatusWithSite": "Active", "localAccountName": "Acme Local", "ofActiveOpportunity": 5, "spoc": "John Doe", "billingCity": "New York", "billingStateProvince": "NY" },
  { "id": 2, "accountName": "Global Tech", "accountStatusWithSite": "Inactive", "localAccountName": "Global Local", "ofActiveOpportunity": 2, "spoc": "Jane Smith", "billingCity": "San Francisco", "billingStateProvince": "CA" },
  { "id": 3, "accountName": "Innovative Solutions", "accountStatusWithSite": "Active", "localAccountName": "Innovative Local", "ofActiveOpportunity": 8, "spoc": "Bill Gates", "billingCity": "Seattle", "billingStateProvince": "WA" },
  { "id": 4, "accountName": "Future Enterprises", "accountStatusWithSite": "Pending", "localAccountName": "Future Local", "ofActiveOpportunity": 3, "spoc": "Elon Musk", "billingCity": "Los Angeles", "billingStateProvince": "CA" },
  { "id": 5, "accountName": "Tech Innovators", "accountStatusWithSite": "Active", "localAccountName": "Tech Local", "ofActiveOpportunity": 7, "spoc": "Mark Zuckerberg", "billingCity": "Menlo Park", "billingStateProvince": "CA" },
  { "id": 6, "accountName": "NextGen Tech", "accountStatusWithSite": "Inactive", "localAccountName": "NextGen Local", "ofActiveOpportunity": 1, "spoc": "Satya Nadella", "billingCity": "Redmond", "billingStateProvince": "WA" },
  { "id": 7, "accountName": "AI Solutions", "accountStatusWithSite": "Active", "localAccountName": "AI Local", "ofActiveOpportunity": 9, "spoc": "Sundar Pichai", "billingCity": "Mountain View", "billingStateProvince": "CA" },
  { "id": 8, "accountName": "Quantum Computing", "accountStatusWithSite": "Pending", "localAccountName": "Quantum Local", "ofActiveOpportunity": 4, "spoc": "Tim Cook", "billingCity": "Cupertino", "billingStateProvince": "CA" },
  { "id": 9, "accountName": "Cyber Security", "accountStatusWithSite": "Active", "localAccountName": "Cyber Local", "ofActiveOpportunity": 6, "spoc": "Jeff Bezos", "billingCity": "Seattle", "billingStateProvince": "WA" },
  { "id": 10, "accountName": "Green Energy", "accountStatusWithSite": "Inactive", "localAccountName": "Green Local", "ofActiveOpportunity": 0, "spoc": "Larry Page", "billingCity": "Mountain View", "billingStateProvince": "CA" },
  { "id": 11, "accountName": "Acme Corp", "accountStatusWithSite": "Active", "localAccountName": "Acme Local", "ofActiveOpportunity": 5, "spoc": "John Doe", "billingCity": "New York", "billingStateProvince": "NY" },
  { "id": 12, "accountName": "Global Tech", "accountStatusWithSite": "Inactive", "localAccountName": "Global Local", "ofActiveOpportunity": 2, "spoc": "Jane Smith", "billingCity": "San Francisco", "billingStateProvince": "CA" },
  { "id": 13, "accountName": "Innovative Solutions", "accountStatusWithSite": "Active", "localAccountName": "Innovative Local", "ofActiveOpportunity": 8, "spoc": "Bill Gates", "billingCity": "Seattle", "billingStateProvince": "WA" },
  { "id": 14, "accountName": "Future Enterprises", "accountStatusWithSite": "Pending", "localAccountName": "Future Local", "ofActiveOpportunity": 3, "spoc": "Elon Musk", "billingCity": "Los Angeles", "billingStateProvince": "CA" },
  { "id": 15, "accountName": "Tech Innovators", "accountStatusWithSite": "Active", "localAccountName": "Tech Local", "ofActiveOpportunity": 7, "spoc": "Mark Zuckerberg", "billingCity": "Menlo Park", "billingStateProvince": "CA" },
  { "id": 16, "accountName": "NextGen Tech", "accountStatusWithSite": "Inactive", "localAccountName": "NextGen Local", "ofActiveOpportunity": 1, "spoc": "Satya Nadella", "billingCity": "Redmond", "billingStateProvince": "WA" },
  { "id": 17, "accountName": "AI Solutions", "accountStatusWithSite": "Active", "localAccountName": "AI Local", "ofActiveOpportunity": 9, "spoc": "Sundar Pichai", "billingCity": "Mountain View", "billingStateProvince": "CA" },
  { "id": 18, "accountName": "Quantum Computing", "accountStatusWithSite": "Pending", "localAccountName": "Quantum Local", "ofActiveOpportunity": 4, "spoc": "Tim Cook", "billingCity": "Cupertino", "billingStateProvince": "CA" },
  { "id": 19, "accountName": "Cyber Security", "accountStatusWithSite": "Active", "localAccountName": "Cyber Local", "ofActiveOpportunity": 6, "spoc": "Jeff Bezos", "billingCity": "Seattle", "billingStateProvince": "WA" },
  { "id": 20, "accountName": "Green Energy", "accountStatusWithSite": "Inactive", "localAccountName": "Green Local", "ofActiveOpportunity": 0, "spoc": "Larry Page", "billingCity": "Mountain View", "billingStateProvince": "CA" },
  { "id": 21, "accountName": "Acme Corp", "accountStatusWithSite": "Active", "localAccountName": "Acme Local", "ofActiveOpportunity": 5, "spoc": "John Doe", "billingCity": "New York", "billingStateProvince": "NY" },
  { "id": 22, "accountName": "Global Tech", "accountStatusWithSite": "Inactive", "localAccountName": "Global Local", "ofActiveOpportunity": 2, "spoc": "Jane Smith", "billingCity": "San Francisco", "billingStateProvince": "CA" },
  { "id": 23, "accountName": "Innovative Solutions", "accountStatusWithSite": "Active", "localAccountName": "Innovative Local", "ofActiveOpportunity": 8, "spoc": "Bill Gates", "billingCity": "Seattle", "billingStateProvince": "WA" },
  { "id": 24, "accountName": "Future Enterprises", "accountStatusWithSite": "Pending", "localAccountName": "Future Local", "ofActiveOpportunity": 3, "spoc": "Elon Musk", "billingCity": "Los Angeles", "billingStateProvince": "CA" },
  { "id": 25, "accountName": "Tech Innovators", "accountStatusWithSite": "Active", "localAccountName": "Tech Local", "ofActiveOpportunity": 7, "spoc": "Mark Zuckerberg", "billingCity": "Menlo Park", "billingStateProvince": "CA" },
  { "id": 26, "accountName": "NextGen Tech", "accountStatusWithSite": "Inactive", "localAccountName": "NextGen Local", "ofActiveOpportunity": 1, "spoc": "Satya Nadella", "billingCity": "Redmond", "billingStateProvince": "WA" },
  { "id": 27, "accountName": "AI Solutions", "accountStatusWithSite": "Active", "localAccountName": "AI Local", "ofActiveOpportunity": 9, "spoc": "Sundar Pichai", "billingCity": "Mountain View", "billingStateProvince": "CA" },
  { "id": 28, "accountName": "Quantum Computing", "accountStatusWithSite": "Pending", "localAccountName": "Quantum Local", "ofActiveOpportunity": 4, "spoc": "Tim Cook", "billingCity": "Cupertino", "billingStateProvince": "CA" },
  { "id": 29, "accountName": "Cyber Security", "accountStatusWithSite": "Active", "localAccountName": "Cyber Local", "ofActiveOpportunity": 6, "spoc": "Jeff Bezos", "billingCity": "Seattle", "billingStateProvince": "WA" },
]

const BUILDINGDATADUMMY = [{
  "id": 1,
  "name": "Building Name",
  "address": "Building Address",
  "space":2,
  "details": {
    "floor": "01",
    "spaceName": "Entire",
    "spaceStatus": "For Sale",
    "possessionStatus": "Vacant",
    "spaceSize": "28,656 sq ft",
    "tenantName": "Rent",
    "leaseType": "Negotiator",
    "commencement": "Immediate",
    "expiry": "Landlord"
  },
  "availability": {
    "availableSpaces": "2",
    "nextAvailability": "Immediate"
  },
  "tenantStack": {
    "tenant1": "ABC Corp",
    "tenant2": "XYZ Ltd"
  }
},
{
  "id": 2,
  "name": "Building Name 2",
  "address": "Building Address 2",
  "space":7,
  "details": {
    "floor": "01",
    "spaceName": "Entire",
    "spaceStatus": "For Sale",
    "possessionStatus": "Vacant",
    "spaceSize": "28,656 sq ft",
    "tenantName": "Rent",
    "leaseType": "Negotiator",
    "commencement": "Immediate",
    "expiry": "Landlord"
  },
  "availability": {
    "availableSpaces": "2",
    "nextAvailability": "Immediate"
  },
  "tenantStack": {
    "tenant1": "ABC Corp",
    "tenant2": "XYZ Ltd"
  }
}
]

const PROPERTYCOLUMNDUMMY = [
  { "label": "Property Name", "accessor": "buildingName", "isClickable": true, "url": "details" },
  { "label": "Address", "accessor": "propertyAddress" },
  { "label": "Total NLA", "accessor": "totalNLAAndVacantArea" },
  { "label": "Grade", "accessor": "grade" },
  { "label": "Region", "accessor": "region" },
  { "label": "Zoning", "accessor": "zoning" },
  { "label": "Status", "accessor": "buildingStatus" },
  { "label": "District", "accessor": "district" },
  { "label": "Floor", "accessor": "floorInformation" },
  { "label": "Street No", "accessor": "streetNumber" },
  { "label": "Street Name", "accessor": "streetName" },
  { "label": "Postal Code", "accessor": "postalCode" },


];


const PROPERTYDATADUMMY = [
  { "id": 1, "propertyName": "Sunset Tower", "address": "101 Sunset Blvd, Los Angeles, CA", "totalNLA": "50,000 sq ft", "floor": 10, "column": "A" },
  { "id": 2, "propertyName": "Riverfront Plaza", "address": "202 River Rd, New York, NY", "totalNLA": "75,000 sq ft", "floor": 20, "column": "B" },
  { "id": 3, "propertyName": "Lakeside Offices", "address": "303 Lakeview Dr, Chicago, IL", "totalNLA": "60,000 sq ft", "floor": 15, "column": "C" },
  { "id": 4, "propertyName": "City Center Tower", "address": "404 Central Ave, San Francisco, CA", "totalNLA": "100,000 sq ft", "floor": 25, "column": "D" },
  { "id": 5, "propertyName": "Downtown Hub", "address": "505 Main St, Seattle, WA", "totalNLA": "45,000 sq ft", "floor": 8, "column": "E" }
];

const DISTRICTDATA = [
  { id: "D01", name: "Boat Quay / Raffles Place / Marina", checked: false },
  { id: "D02", name: "Chinatown / Tanjong Pagar", checked: false },
  { id: "D03", name: "Alexandra / Commonwealth", checked: false },
  { id: "D04", name: "Harbourfront / Telok Blangah", checked: false },
  { id: "D05", name: "Buona Vista / West Coast / Clementi New Town", checked: false },
  { id: "D06", name: "City Hall / Clarke Quay", checked: false },
  { id: "D07", name: "Beach Road / Bugis / Rochor", checked: false },
  { id: "D08", name: "Farrer Park / Serangoon Rd", checked: false },
  { id: "D09", name: "Orchard / River Valley", checked: false },
  { id: "D10", name: "Tanglin / Holland / Bukit Timah", checked: false },
  { id: "D11", name: "Newton / Novena", checked: false },
  { id: "D12", name: "Balestier / Toa Payoh", checked: false },
  { id: "D13", name: "Macpherson / Potong Pasir", checked: false },
  { id: "D14", name: "Eunos / Geylang / Paya Lebar", checked: false },
  { id: "D15", name: "East Coast / Marine Parade", checked: false },
  { id: "D16", name: "Bedok / Upper East Coast", checked: false },
  { id: "D17", name: "Changi Airport / Changi Village", checked: false },
  { id: "D18", name: "Pasir Ris / Tampines", checked: false },
  { id: "D19", name: "Hougang / Punggol / Sengkang", checked: false },
  { id: "D20", name: "Ang Mo Kio / Bishan / Thomson", checked: false },
  { id: "D21", name: "Clementi Park / Upper Bukit Timah", checked: false },
  { id: "D22", name: "Boon Lay / Jurong / Tuas", checked: false },
  { id: "D23", name: "Dairy Farm / Bukit Panjang / Choa Chu Kang", checked: false },
  { id: "D24", name: "Lim Chu Kang / Tengah", checked: false },
  { id: "D25", name: "Admiralty / Woodlands", checked: false },
  { id: "D26", name: "Mandai / Upper Thomson", checked: false },
  { id: "D27", name: "Sembawang / Yishun", checked: false },
  { id: "D28", name: "Seletar / Yio Chu Kang", checked: false },
];

export { CONTACTDATADUMMY, ACCOUNTDATADUMMY, ACCOUNTCOLUMNDUMMY, BUILDINGDATADUMMY, CONTACTCOLUMNDUMMY, PROPERTYCOLUMNDUMMY, PROPERTYDATADUMMY, DISTRICTDATA};
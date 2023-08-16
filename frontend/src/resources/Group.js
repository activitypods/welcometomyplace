export default {
  dataModel: {
    types: ["vcard:Group"],
    list: {
      servers: "pod",
      blankNodes: ["vcard:hasMember"],
      containers: { pod: ["/groups"] },
    },
  },
};

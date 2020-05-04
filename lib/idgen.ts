import { simpleflake } from "simpleflakes";

const idgen = () => simpleflake(Date.now(), null, Date.UTC(2020, 0)).toString();

export default idgen;

import Section from '../ui/Section'
import TextInput from '../ui/TextInput'
import TextArea from '../ui/TextArea'
import ListInput from '../ui/ListInput'
import DimensionIntro from '../ui/DimensionIntro'

export default function P5Ecosystem({ data, setField }) {
  return (
    <div>
      <div className="sec-badge">🌐 Part 5</div>
      <h1 className="sec-title">Regional Ecosystem Impact</h1>
      <p className="sec-desc">
        Academic networks, visiting lecturers, and civic engagement.
      </p>

      <Section number="5.1" title="Academic and Professional Networks" open={true}>
        <DimensionIntro
          label="Partnerships"
          types="PDF agreements, MOU documents, or partnership spreadsheets"
        />
        <ListInput
          indicator="5.1.1"
          label="Partnerships with academic institutions in zone"
          items={data.acadPartners ?? [""]}
          onChange={(e) => setField("acadPartners", e)}
        />
        <ListInput
          indicator="5.1.2"
          label="Partnerships with professional institutions"
          items={data.profPartners ?? [""]}
          onChange={(e) => setField("profPartners", e)}
        />
        <ListInput
          indicator="5.1.3"
          label="Partnerships with local / regional public authorities"
          items={data.govtPartners ?? [""]}
          onChange={(e) => setField("govtPartners", e)}
        />
        <ListInput
          indicator="5.1.4"
          label="Collaborative initiatives within the wider university"
          items={data.uniInitiatives ?? [""]}
          onChange={(e) => setField("uniInitiatives", e)}
        />
        <TextArea
          indicator="5.1.5"
          label="Regional ecosystem diagram / description"
          value={data.ecoDesc}
          onChange={(e) => setField("ecoDesc", e)}
        />
      </Section>

      <Section number="5.2" title="Visiting Lecturers and Adjunct Professors">
        <TextInput
          indicator="5.2.1"
          label="Managers/professionals from region in educational activities"
          value={data.visitMgrs}
          onChange={(e) => setField("visitMgrs", e)}
        />
        <TextArea
          indicator="5.2.2"
          label="Key practitioners and their contributions"
          value={data.visitContrib}
          onChange={(e) => setField("visitContrib", e)}
        />
      </Section>

      <Section number="5.3" title="Staff in Professional or Civic Functions">
        <DimensionIntro
          label="Staff CVs"
          types="faculty and staff CVs highlighting board memberships and civic roles"
        />
        <ListInput
          indicator="5.3.1"
          label="Staff members in local professional or civic bodies"
          items={data.civicRoles ?? [""]}
          onChange={(e) => setField("civicRoles", e)}
          placeholder="Name — Organisation — Role"
        />
      </Section>
    </div>
  )
}

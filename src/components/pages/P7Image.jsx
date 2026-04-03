import Section from '../ui/Section'
import TextInput from '../ui/TextInput'
import TextArea from '../ui/TextArea'
import ListInput from '../ui/ListInput'

export default function P7Image({ data, setField }) {
  return (
    <div>
      <div className="sec-badge">⭐ Part 7</div>
      <h1 className="sec-title">Image Impact</h1>
      <p className="sec-desc">
        Business attractiveness, media presence, rankings, and regional reputation.
      </p>

      <Section number="7.1" title="Attractiveness for Business Enterprise" open={true}>
        <TextArea
          indicator="7.1.1"
          label="Contribution to local development projects attracting new companies"
          value={data.devContrib}
          onChange={(e) => setField("devContrib", e)}
        />
        <ListInput
          indicator="7.1.2"
          label="Examples of supporting companies that relocated to the region"
          items={data.relocatedCos ?? [""]}
          onChange={(e) => setField("relocatedCos", e)}
        />
      </Section>

      <Section number="7.2" title="Regional Image">
        <TextArea
          indicator="7.2.1"
          label="School's image among regional stakeholders"
          value={data.regImage}
          onChange={(e) => setField("regImage", e)}
        />
        <div className="fr2">
          <TextInput
            indicator="7.2.2"
            label="Citations in regional media (12mo)"
            value={data.regCitations}
            onChange={(e) => setField("regCitations", e)}
          />
          <TextInput
            indicator="7.2.3"
            label="Feature articles in regional press"
            value={data.regFeatures}
            onChange={(e) => setField("regFeatures", e)}
          />
        </div>
        <ListInput
          indicator="7.2.4"
          label="Significant regional media examples"
          items={data.regMediaEx ?? [""]}
          onChange={(e) => setField("regMediaEx", e)}
        />
        <TextInput
          indicator="7.2.5"
          label="Regional forums where school was present"
          value={data.regForums}
          onChange={(e) => setField("regForums", e)}
        />
      </Section>

      <Section number="7.3" title="National Image">
        <div className="fr2">
          <TextInput
            indicator="7.3.1"
            label="Citations in national media (12mo)"
            value={data.natCitations}
            onChange={(e) => setField("natCitations", e)}
          />
          <TextInput
            indicator="7.3.2"
            label="Feature articles in national press"
            value={data.natFeatures}
            onChange={(e) => setField("natFeatures", e)}
          />
        </div>
        <ListInput
          indicator="7.3.3"
          label="Significant national media examples"
          items={data.natMediaEx ?? [""]}
          onChange={(e) => setField("natMediaEx", e)}
        />
      </Section>

      <Section number="7.4" title="International Image and Rankings">
        <ListInput
          indicator="7.4.1"
          label="International rankings and positions"
          items={data.intlRankings ?? [""]}
          onChange={(e) => setField("intlRankings", e)}
          placeholder="Ranking — Position — Year"
        />
        <ListInput
          indicator="7.4.2"
          label="International media coverage"
          items={data.intlMedia ?? [""]}
          onChange={(e) => setField("intlMedia", e)}
        />
        <TextArea
          indicator="7.4.3"
          label="International partnerships that enhance regional visibility"
          value={data.intlPartVis}
          onChange={(e) => setField("intlPartVis", e)}
        />
      </Section>

      <Section number="7.5" title="Overall Contribution to Regional Attractiveness">
        <TextArea
          indicator="7.5.1"
          label="How does the school's reputation reinforce the city/region's image?"
          value={data.repContrib}
          onChange={(e) => setField("repContrib", e)}
        />
        <TextArea
          indicator="7.5.2"
          label="Distinctive alignment of school expertise with regional traditions"
          value={data.alignment}
          onChange={(e) => setField("alignment", e)}
        />
      </Section>
    </div>
  )
}

import Section from '../ui/Section'
import TextInput from '../ui/TextInput'
import TextArea from '../ui/TextArea'
import ListInput from '../ui/ListInput'

function CheckboxGroup({ label, hint, ind, options, selected, onChange }) {
  return (
    <div className="fg">
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5, flexWrap: 'wrap' }}>
        {ind && <span className="ind">{ind}</span>}
        <label className="lbl" style={{ marginBottom: 0 }}>
          {label}
          {hint && <span className="lbl-hint"> — {hint}</span>}
        </label>
      </div>
      <div className="cbgrid">
        {options.map((option) => (
          <label key={option} className={`cb-item${selected.includes(option) ? " on" : ""}`}>
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() =>
                onChange(
                  selected.includes(option)
                    ? selected.filter((item) => item !== option)
                    : [...selected, option]
                )
              }
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}

export default function P6Societal({ data, setField }) {
  return (
    <div>
      <div className="sec-badge">🌱 Part 6</div>
      <h1 className="sec-title">Societal Impact</h1>
      <p className="sec-desc">
        CSR policies, SDG commitment, diversity, inclusion, and environmental practices.
      </p>

      <Section number="6.1" title="CSR and SDG Commitment" open={true}>
        <TextArea
          indicator="6.1.1"
          label="School's specific CSR and sustainable development policies"
          value={data.csrPolicies}
          onChange={(e) => setField("csrPolicies", e)}
        />
        <TextArea
          indicator="6.1.2"
          label="Management structure for implementing CSR"
          value={data.csrMgmt}
          onChange={(e) => setField("csrMgmt", e)}
        />
        <CheckboxGroup
          ind="6.1.3"
          label="SDGs actively addressed"
          options={[
            "SDG 1",
            "SDG 2",
            "SDG 3",
            "SDG 4",
            "SDG 5",
            "SDG 6",
            "SDG 7",
            "SDG 8",
            "SDG 9",
            "SDG 10",
            "SDG 11",
            "SDG 12",
            "SDG 13",
            "SDG 14",
            "SDG 15",
            "SDG 16",
            "SDG 17",
          ]}
          selected={data.sdgs ?? []}
          onChange={(e) => setField("sdgs", e)}
        />
        <TextArea
          indicator="6.1.4"
          label="School as environmental management role model"
          value={data.envModel}
          onChange={(e) => setField("envModel", e)}
        />
        <TextArea
          indicator="6.1.5"
          label="School as diversity and inclusion role model"
          value={data.divModel}
          onChange={(e) => setField("divModel", e)}
        />
      </Section>

      <Section number="6.2" title="CSR in Academic and Educational Activities">
        <TextArea
          indicator="6.2.1"
          label="Programmes and courses on CSR and SDGs"
          value={data.csrCourses}
          onChange={(e) => setField("csrCourses", e)}
        />
        <ListInput
          indicator="6.2.2"
          label="Innovative educational projects on CSR / sustainability"
          items={data.csrProjects ?? [""]}
          onChange={(e) => setField("csrProjects", e)}
        />
        <TextArea
          indicator="6.2.3"
          label="CSR in research and publications — mapped against SDGs"
          value={data.csrResearch}
          onChange={(e) => setField("csrResearch", e)}
        />
      </Section>

      <Section number="6.3" title="CSR in Organisational Practices">
        <TextArea
          indicator="6.3.1"
          label="Environmental sustainability practices"
          value={data.envPractices}
          onChange={(e) => setField("envPractices", e)}
        />
        <div className="fr3">
          <TextInput
            indicator="6.3.2"
            label="Female faculty"
            suffix="%"
            value={data.femaleFaculty}
            onChange={(e) => setField("femaleFaculty", e)}
          />
          <TextInput
            indicator="6.3.3"
            label="Female admin staff"
            suffix="%"
            value={data.femaleAdmin}
            onChange={(e) => setField("femaleAdmin", e)}
          />
          <TextInput
            indicator="6.3.4"
            label="Female students"
            suffix="%"
            value={data.femaleStudents}
            onChange={(e) => setField("femaleStudents", e)}
          />
        </div>
        <div className="fr3">
          <TextInput
            indicator="6.3.5"
            label="International faculty"
            suffix="%"
            value={data.intlFaculty}
            onChange={(e) => setField("intlFaculty", e)}
          />
          <TextInput
            indicator="6.3.6"
            label="International admin"
            suffix="%"
            value={data.intlAdmin}
            onChange={(e) => setField("intlAdmin", e)}
          />
          <TextInput
            indicator="6.3.7"
            label="International students"
            suffix="%"
            value={data.intlStudents}
            onChange={(e) => setField("intlStudents", e)}
          />
        </div>
        <TextInput
          indicator="6.3.8"
          label="Disadvantaged students admitted (annual)"
          value={data.disadvStudents}
          onChange={(e) => setField("disadvStudents", e)}
        />
        <TextArea
          indicator="6.3.9"
          label="Financial support for access and inclusion"
          value={data.finSupport}
          onChange={(e) => setField("finSupport", e)}
        />
      </Section>
    </div>
  )
}

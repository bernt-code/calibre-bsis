import React from "react";
import Section from "../ui/Section";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import ListInput from "../ui/ListInput";
import FormGroup from "../ui/FormGroup";
import DimensionIntro from "../ui/DimensionIntro";

// Helper component for CheckboxGroup
function CheckboxGroup({
  label: labelText,
  hint,
  ind,
  options,
  selected,
  onChange
}) {
  return (
    <div className="fg">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          marginBottom: 5,
          flexWrap: "wrap"
        }}
      >
        {ind && <span className="ind">{ind}</span>}
        <label
          className="lbl"
          style={{
            marginBottom: 0
          }}
        >
          {labelText}
          {hint && (
            <span className="lbl-hint">
              {" — "}
              {hint}
            </span>
          )}
        </label>
      </div>
      <div className="cbgrid">
        {options.map((option) => (
          <label
            key={option}
            className={`cb-item${selected.includes(option) ? " on" : ""}`}
          >
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
  );
}

// Helper component for Card Section
function CardSection({
  num,
  title,
  sub,
  color,
  open,
  children
}) {
  const [isOpen, setIsOpen] = React.useState(open ?? false);

  return (
    <div className={`card${isOpen ? " card-open" : ""}`}>
      <div className="card-hdr" onClick={() => setIsOpen(!isOpen)}>
        <div className="card-hdr-l">
          <div
            className="card-num"
            style={{
              background: color || "#2e8b57"
            }}
          >
            {num}
          </div>
          <div>
            <div className="card-ttl">{title}</div>
            {sub && <div className="card-sub">{sub}</div>}
          </div>
        </div>
        <span className="chevron">▾</span>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default function P2Educational({ data, setField }) {
  return (
    <div>
      <div className="sec-badge">🎓 Part 2</div>
      <h1 className="sec-title">Educational Impact</h1>
      <p className="sec-desc">
        Admission flows, graduate employment, executive education, and alumni networks.
      </p>

      <CardSection num="2.1" title="Admission Flows" open={true}>
        <DimensionIntro
          label="Student data"
          types="enrolment reports, student data spreadsheets"
        />
        <div className="fr2">
          <TextInput
            indicator="2.1.1"
            label="Students from region"
            value={data.studRegion}
            onChange={(e) => setField("studRegion", e)}
          />
          <TextInput
            indicator="2.1.2"
            label="National (outside region)"
            value={data.studNational}
            onChange={(e) => setField("studNational", e)}
          />
        </div>
        <div className="fr2">
          <TextInput
            indicator="2.1.3"
            label="International (degree)"
            value={data.studIntlDegree}
            onChange={(e) => setField("studIntlDegree", e)}
          />
          <TextInput
            indicator="2.1.4"
            label="International on exchange"
            value={data.studIntlExch}
            onChange={(e) => setField("studIntlExch", e)}
          />
        </div>
        <TextInput
          indicator="2.1.5"
          label="Total student body"
          value={data.studTotal}
          onChange={(e) => setField("studTotal", e)}
        />
        <TextArea
          indicator="2.1.6"
          label="Comments on student mix and regional significance"
          value={data.studComments}
          onChange={(e) => setField("studComments", e)}
        />
      </CardSection>

      <CardSection num="2.2" title="Entry into the Job Market">
        <div className="fr2">
          <TextInput
            indicator="2.2.1"
            label="Total graduates (past 12mo)"
            value={data.gradsTotal}
            onChange={(e) => setField("gradsTotal", e)}
          />
          <TextInput
            indicator="2.2.2"
            label="Entering regional job market"
            value={data.gradsRegion}
            onChange={(e) => setField("gradsRegion", e)}
          />
        </div>
        <div className="fr2">
          <TextInput
            indicator="2.2.3"
            label="Entering national market"
            value={data.gradsNational}
            onChange={(e) => setField("gradsNational", e)}
          />
          <TextInput
            indicator="2.2.4"
            label="Entering international market"
            value={data.gradsIntl}
            onChange={(e) => setField("gradsIntl", e)}
          />
        </div>
        <div className="fr2">
          <TextInput
            indicator="2.2.5"
            label="% intl grads — first job in region"
            suffix="%"
            value={data.intlGradRegion}
            onChange={(e) => setField("intlGradRegion", e)}
          />
          <TextInput
            indicator="2.2.6"
            label="% intl grads — first job in country"
            suffix="%"
            value={data.intlGradCountry}
            onChange={(e) => setField("intlGradCountry", e)}
          />
        </div>
        <TextArea
          indicator="2.2.7"
          label="Breakdown by programme segment"
          value={data.gradBreakdown}
          onChange={(e) => setField("gradBreakdown", e)}
        />
      </CardSection>

      <CardSection num="2.3" title="Executive Education">
        <div className="fr2">
          <TextInput
            indicator="2.3.1"
            label="Exec-ed participants from zone"
            value={data.execEdZone}
            onChange={(e) => setField("execEdZone", e)}
          />
          <TextInput
            indicator="2.3.2"
            label="Total exec-ed days in zone"
            value={data.execEdDays}
            onChange={(e) => setField("execEdDays", e)}
          />
        </div>
        <ListInput
          indicator="2.3.3"
          label="Companies sending managers to open courses"
          items={data.execEdCompanies ?? [""]}
          onChange={(e) => setField("execEdCompanies", e)}
          placeholder="Company name…"
        />
        <ListInput
          indicator="2.3.4"
          label="Companies receiving customised courses"
          items={data.execEdCustom ?? [""]}
          onChange={(e) => setField("execEdCustom", e)}
          placeholder="Company name…"
        />
        <CheckboxGroup
          ind="2.3.5"
          label="Target groups"
          options={[
            "Top managers",
            "Middle managers",
            "Junior managers",
            "Technicians",
            "Functional specialists",
            "Job seekers",
            "Other"
          ]}
          selected={data.execEdTargets ?? []}
          onChange={(e) => setField("execEdTargets", e)}
        />
        <CheckboxGroup
          ind="2.3.6"
          label="Course content areas"
          options={[
            "Sales",
            "Finance",
            "Marketing",
            "Export",
            "Project management",
            "Leadership",
            "Digital / AI",
            "Sustainability",
            "Other"
          ]}
          selected={data.execEdContent ?? []}
          onChange={(e) => setField("execEdContent", e)}
        />
      </CardSection>

      <CardSection num="2.4" title="Part-time Degree & Certification">
        <div className="fr3">
          <TextInput
            indicator="2.4.1"
            label="Graduates — Bachelor's (PT)"
            value={data.ptBachelor}
            onChange={(e) => setField("ptBachelor", e)}
          />
          <TextInput
            indicator="2.4.2"
            label="Graduates — Master's (PT)"
            value={data.ptMaster}
            onChange={(e) => setField("ptMaster", e)}
          />
          <TextInput
            indicator="2.4.3"
            label="Graduates — MBA (PT)"
            value={data.ptMBA}
            onChange={(e) => setField("ptMBA", e)}
          />
        </div>
        <div className="fr2">
          <TextInput
            indicator="2.4.4"
            label="Graduates — DBA (PT)"
            value={data.ptDBA}
            onChange={(e) => setField("ptDBA", e)}
          />
          <TextInput
            indicator="2.4.5"
            label="Certification programmes (1+ yr)"
            value={data.ptCerts}
            onChange={(e) => setField("ptCerts", e)}
          />
        </div>
        <ListInput
          indicator="2.4.6"
          label="Companies sending employees to PT programmes"
          items={data.ptCompanies ?? [""]}
          onChange={(e) => setField("ptCompanies", e)}
          placeholder="Company name…"
        />
      </CardSection>

      <CardSection num="2.5" title="Alumni">
        <DimensionIntro
          label="Alumni records"
          types="alumni spreadsheets or LinkedIn data exports"
        />
        <div className="fr2">
          <TextInput
            indicator="2.5.1"
            label="Total alumni in region"
            value={data.alumniRegion}
            onChange={(e) => setField("alumniRegion", e)}
          />
          <TextInput
            indicator="2.5.2"
            label="International alumni in region"
            value={data.alumniIntl}
            onChange={(e) => setField("alumniIntl", e)}
          />
        </div>
        <FormGroup
          label="Structured Alumni Association in region?"
          indicator="2.5.3"
        >
          <select
            value={data.alumniAssoc ?? ""}
            onChange={(e) => setField("alumniAssoc", e.target.value)}
          >
            <option value="">Select…</option>
            <option>Yes</option>
            <option>No</option>
            <option>Informal network only</option>
          </select>
        </FormGroup>
        <ListInput
          indicator="2.5.4"
          label="Alumni Association events (past 12 months)"
          items={data.alumniEvents ?? [""]}
          onChange={(e) => setField("alumniEvents", e)}
          placeholder="Event name…"
        />
        <ListInput
          indicator="2.5.5"
          label="Alumni in senior roles at local companies (500+)"
          items={data.alumniSenior ?? [""]}
          onChange={(e) => setField("alumniSenior", e)}
          placeholder="Name — Company — Role"
        />
        <TextArea
          indicator="2.5.6"
          label="Evidence of alumni impact at regional level"
          value={data.alumniEvidence}
          onChange={(e) => setField("alumniEvidence", e)}
        />
      </CardSection>
    </div>
  );
}

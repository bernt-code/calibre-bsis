import React from "react";
import Section from "../ui/Section";
import FormGroup from "../ui/FormGroup";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import ListInput from "../ui/ListInput";

/**
 * SchoolProfile page - institution identity, competitive context, impact zone
 */
export default function SchoolProfile({ data, setField }) {
  return (
    <div>
      <div className="sec-badge">🏫 School Profile</div>
      <h1 className="sec-title">Institution Details</h1>
      <p className="sec-desc">
        Basic information that frames every dimension of your BSIS pre-visit report.
      </p>

      {/* Section A: Identity */}
      <Section
        number="A"
        color="#0ea5e9"
        title="Identity"
        open={true}
      >
        <div className="fr2">
          <FormGroup label="Institution name">
            <input
              type="text"
              value={data.name ?? ""}
              onChange={e => setField("name", e.target.value)}
              placeholder="e.g. University of Vaasa"
            />
          </FormGroup>
          <FormGroup label="Public or private">
            <select
              value={data.type ?? ""}
              onChange={e => setField("type", e.target.value)}
            >
              <option value="">Select…</option>
              <option>Public</option>
              <option>Private</option>
              <option>Public-Private</option>
            </select>
          </FormGroup>
        </div>

        <FormGroup label="Institution type">
          <select
            value={data.instType ?? ""}
            onChange={e => setField("instType", e.target.value)}
          >
            <option value="">Select…</option>
            <option>University Faculty</option>
            <option>University Business School</option>
            <option>Business University</option>
            <option>Independent School of Business</option>
            <option>Graduate School of Business</option>
          </select>
        </FormGroup>

        <div className="fr2">
          <FormGroup label="Dean / Director">
            <input
              type="text"
              value={data.dean ?? ""}
              onChange={e => setField("dean", e.target.value)}
            />
          </FormGroup>
          <FormGroup label="Country">
            <input
              type="text"
              value={data.country ?? ""}
              onChange={e => setField("country", e.target.value)}
            />
          </FormGroup>
        </div>

        <FormGroup label="City / Region">
          <input
            type="text"
            value={data.city ?? ""}
            onChange={e => setField("city", e.target.value)}
          />
        </FormGroup>

        <TextArea
          label="Mission"
          value={data.mission}
          onChange={e => setField("mission", e)}
        />

        <div className="fr2">
          <TextArea
            label="Vision"
            value={data.vision}
            onChange={e => setField("vision", e)}
          />
          <TextArea
            label="Core values"
            value={data.values}
            onChange={e => setField("values", e)}
          />
        </div>
      </Section>

      {/* Section B: Competitive Context */}
      <Section
        number="B"
        color="#0ea5e9"
        title="Competitive Context"
      >
        <ListInput
          label="Direct competitors"
          items={data.competitors ?? [""]}
          onChange={items => setField("competitors", items)}
          placeholder="School name…"
        />
        <ListInput
          label="Inspirational schools"
          items={data.inspirational ?? [""]}
          onChange={items => setField("inspirational", items)}
          placeholder="School name…"
        />
      </Section>

      {/* Section C: Impact Zone & Scope */}
      <Section
        number="C"
        color="#0ea5e9"
        title="Impact Zone & Scope"
      >
        <div className="info">
          Define the geographic area where you will measure impact.
        </div>

        <div className="fr2">
          <FormGroup label="Impact zone">
            <input
              type="text"
              value={data.zone ?? ""}
              onChange={e => setField("zone", e.target.value)}
              placeholder="e.g. Ostrobothnia region"
            />
          </FormGroup>
          <FormGroup label="Scope of assessment">
            <select
              value={data.scope ?? ""}
              onChange={e => setField("scope", e.target.value)}
            >
              <option value="">Select…</option>
              <option>Business school only</option>
              <option>Multiple faculties</option>
              <option>Entire university</option>
              <option>Specific campus</option>
            </select>
          </FormGroup>
        </div>

        <TextArea
          label="Rationale for zone definition"
          value={data.zoneRationale}
          onChange={e => setField("zoneRationale", e)}
        />
        <TextArea
          label="Link between school mission and regional environment"
          value={data.missionLink}
          onChange={e => setField("missionLink", e)}
        />
      </Section>

      {/* Section D: Faculty & Staff Headcount */}
      <Section
        number="D"
        color="#0ea5e9"
        title="Faculty & Staff Headcount"
      >
        <div className="az">
          <div className="az-icon">✦</div>
          <div className="az-text">
            <h4>Allsorter — Faculty CVs</h4>
            <p>Upload PDF or Word CVs for all faculty members to auto-populate fields in this section</p>
          </div>
          <div className="az-right">
            <button className="btn btn-green btn-sm">Upload & parse</button>
          </div>
        </div>

        <div className="fr3">
          <TextInput
            label="Core faculty (full-time)"
            value={data.coreFaculty}
            onChange={e => setField("coreFaculty", e)}
          />
          <TextInput
            label="Teaching assistants"
            value={data.tas}
            onChange={e => setField("tas", e)}
          />
          <TextInput
            label="Adjunct / part-time"
            value={data.adjunct}
            onChange={e => setField("adjunct", e)}
          />
        </div>

        <div className="fr2">
          <TextInput
            label="Admin staff"
            value={data.adminStaff}
            onChange={e => setField("adminStaff", e)}
          />
          <TextInput
            label="Adjunct teaching (%)"
            suffix="%"
            value={data.adjunctPct}
            onChange={e => setField("adjunctPct", e)}
          />
        </div>
      </Section>
    </div>
  );
}


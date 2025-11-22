import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

export default function EditModal({ isOpen, onRequestClose, tax, countries = [], onSave }) {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setName(tax?.name ?? '')
    setCountry(tax?.country ?? '')
  }, [tax])

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setSaving(true)
      await onSave(tax.id, { name, country })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center"
      className="bg-white rounded-md p-6 w-full max-w-md mx-4"
    >
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-semibold">Edit Tax</h2>
        <button onClick={onRequestClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="block mb-3">
          <div className="text-sm text-gray-600 mb-1">Name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-4">
          <div className="text-sm text-gray-600 mb-1">Country</div>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.id ?? c.code ?? c.name} value={c.name || c.country || c.code}>
                {c.name ?? c.country ?? c.code}
              </option>
            ))}
          </select>
        </label>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onRequestClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-blue-600 text-white flex items-center gap-2">
            {saving ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 8v4m8-8h-4M4 12H0" />
              </svg>
            ) : null}
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}

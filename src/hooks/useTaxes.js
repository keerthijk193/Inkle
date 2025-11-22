import { useEffect, useState } from 'react'
import * as api from '../api/api'

export default function useTaxes() {
  const [taxes, setTaxes] = useState([])
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTax, setEditingTax] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const [taxRes, countryRes] = await Promise.all([api.getTaxes(), api.getCountries()])
        if (!mounted) return
        setTaxes(taxRes || [])
        setCountries(countryRes || [])
        setError(null)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  async function refetch() {
    setLoading(true)
    try {
      const taxRes = await api.getTaxes()
      setTaxes(taxRes || [])
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  function openEdit(tax) {
    setEditingTax(tax)
    setIsModalOpen(true)
  }

  function closeEdit() {
    setEditingTax(null)
    setIsModalOpen(false)
  }

  async function saveEdit(id, updatedFields) {
    // Merge with existing and handle notification
    const existing = taxes.find((t) => String(t.id) === String(id)) || {}
    const payload = { ...existing, ...updatedFields }
    try {
      const updated = await api.updateTax(id, payload)
      setTaxes((prev) => prev.map((t) => (String(t.id) === String(id) ? updated : t)))
      setSuccessMessage('Saved successfully')
      // clear after 3s
      setTimeout(() => setSuccessMessage(''), 3000)
      closeEdit()
      return updated
    } catch (err) {
      setError(err)
      throw err
    }
  }

  return {
    taxes,
    countries,
    loading,
    error,
    successMessage,
    isModalOpen,
    editingTax,
    openEdit,
    closeEdit,
    saveEdit,
    refetch,
  }
}


function Confirm({ onSubmit, onCancel, title, open, setOpen }) {
  const handleSubmit = () => {
    onSubmit && onSubmit()
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
    if (onCancel) {
      onCancel()
    }
  }
  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px 28px",
              borderRadius: "12px",
              minWidth: "320px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              textAlign: "center"
            }}
          >
            <h2
              style={{
                margin: "0 0 20px",
                fontSize: "20px"
              }}
            >
              {title}
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px"
              }}
            >
              <button
                onClick={handleSubmit}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "#4f46e5",
                  color: "#fff"
                }}
              >
                OK
              </button>

              <button
                onClick={handleCancel}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: "#e5e7eb"
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  )
}
export default Confirm
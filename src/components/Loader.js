import { useEffect } from 'react'
import { useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress, loaded } = useProgress()

  useEffect(() => {
    console.log(loaded,'asdf')
  }, [loaded])

  return null
}